from dataclasses import dataclass
from datetime import datetime
from decimal import Decimal
from typing import List, Optional
from fpdf import FPDF  # Requires fpdf2 package: pip install fpdf2

@dataclass
class Item:
    """Represents an invoice item"""
    name: str
    description: str
    quantity: Decimal
    unit_price: Decimal
    tax_rate: Decimal = Decimal("0.00")

    def subtotal(self) -> Decimal:
        return self.quantity * self.unit_price

    def tax_amount(self) -> Decimal:
        return self.subtotal() * self.tax_rate

    def total(self) -> Decimal:
        return self.subtotal() + self.tax_amount()

class Discount:
    """Base class for discount strategies"""
    def apply(self, subtotal: Decimal) -> Decimal:
        raise NotImplementedError

@dataclass
class PercentageDiscount(Discount):
    """Percentage-based discount"""
    percentage: Decimal

    def apply(self, subtotal: Decimal) -> Decimal:
        return subtotal * (self.percentage / Decimal("100.00"))

@dataclass
class FixedAmountDiscount(Discount):
    """Fixed amount discount"""
    amount: Decimal

    def apply(self, subtotal: Decimal) -> Decimal:
        return min(self.amount, subtotal)

class Pricing:
    """Handles pricing calculations"""
    def __init__(self, items: List[Item], discount: Optional[Discount] = None):
        self.items = items
        self.discount = discount

    def subtotal(self) -> Decimal:
        return sum(item.subtotal() for item in self.items)

    def total_tax(self) -> Decimal:
        return sum(item.tax_amount() for item in self.items)

    def discount_amount(self) -> Decimal:
        if self.discount:
            return self.discount.apply(self.subtotal())
        return Decimal("0.00")

    def grand_total(self) -> Decimal:
        return self.subtotal() + self.total_tax() - self.discount_amount()

class InvoicePDF(FPDF):
    """PDF generator for invoices"""
    def __init__(self, invoice_number: str, date: datetime, client_info: str, pricing: Pricing):
        super().__init__()
        self.invoice_number = invoice_number
        self.date = date
        self.client_info = client_info
        self.pricing = pricing

    def header(self):
        self.set_font('Arial', 'B', 16)
        self.cell(0, 10, 'INVOICE', 0, 1, 'C')
        self.ln(10)

        self.set_font('Arial', '', 12)
        self.cell(0, 6, f'Invoice #: {self.invoice_number}', 0, 1)
        self.cell(0, 6, f'Date: {self.date.strftime("%Y-%m-%d")}', 0, 1)
        self.ln(5)

        self.set_font('Arial', 'B', 12)
        self.cell(0, 6, 'Bill To:', 0, 1)
        self.set_font('Arial', '', 12)
        self.multi_cell(0, 6, self.client_info)
        self.ln(10)

    def items_table(self):
        # Table header
        self.set_font('Arial', 'B', 12)
        self.cell(60, 10, 'Item', 1)
        self.cell(80, 10, 'Description', 1)
        self.cell(20, 10, 'Qty', 1)
        self.cell(20, 10, 'Unit Price', 1)
        self.cell(20, 10, 'Amount', 1, 1)

        # Table rows
        self.set_font('Arial', '', 12)
        for item in self.pricing.items:
            self.cell(60, 10, item.name, 1)
            self.cell(80, 10, item.description, 1)
            self.cell(20, 10, str(item.quantity), 1)
            self.cell(20, 10, f"${item.unit_price:.2f}", 1)
            self.cell(20, 10, f"${item.subtotal():.2f}", 1, 1)

    def totals_section(self):
        self.ln(10)
        self.set_font('Arial', '', 12)
        
        self.cell(160, 10, 'Subtotal:', 0, 0, 'R')
        self.cell(30, 10, f"${self.pricing.subtotal():.2f}", 0, 1, 'R')
        
        if self.pricing.discount:
            self.cell(160, 10, 'Discount:', 0, 0, 'R')
            self.cell(30, 10, f"-${self.pricing.discount_amount():.2f}", 0, 1, 'R')
        
        self.cell(160, 10, 'Tax:', 0, 0, 'R')
        self.cell(30, 10, f"${self.pricing.total_tax():.2f}", 0, 1, 'R')
        
        self.set_font('Arial', 'B', 12)
        self.cell(160, 10, 'Total:', 0, 0, 'R')
        self.cell(30, 10, f"${self.pricing.grand_total():.2f}", 0, 1, 'R')

    def footer(self):
        self.set_y(-15)
        self.set_font('Arial', 'I', 8)
        self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')

    def generate(self, filename: str):
        self.add_page()
        self.items_table()
        self.totals_section()
        self.output(filename)

class InvoiceSystem:
    """Composes all modules to create invoices"""
    def __init__(self):
        self.items: List[Item] = []
        self.discount: Optional[Discount] = None
        self.client_info: str = ""
        self.invoice_number: str = "0001"
        self.date: datetime = datetime.now()

    def add_item(self, item: Item):
        self.items.append(item)
        return self

    def set_discount(self, discount: Discount):
        self.discount = discount
        return self

    def set_client_info(self, info: str):
        self.client_info = info
        return self

    def set_invoice_number(self, number: str):
        self.invoice_number = number
        return self

    def set_date(self, date: datetime):
        self.date = date
        return self

    def generate_pdf(self, filename: str):
        if not self.items:
            raise ValueError("Cannot generate invoice with no items")
        
        pricing = Pricing(self.items, self.discount)
        pdf = InvoicePDF(
            invoice_number=self.invoice_number,
            date=self.date,
            client_info=self.client_info,
            pricing=pricing
        )
        pdf.generate(filename)

# Example usage
if __name__ == "__main__":
    # Create invoice items
    items = [
        Item("Website Design", "Homepage redesign", Decimal("1"), Decimal("1200.00"), Decimal("0.10")),
        Item("Hosting", "Annual hosting package", Decimal("1"), Decimal("300.00"), Decimal("0.05")),
        Item("Domain", "Domain registration", Decimal("1"), Decimal("15.00"), Decimal("0.00"))
    ]

    # Create invoice
    invoice = (InvoiceSystem()
        .set_client_info("Acme Corp\n123 Business Rd\nNew York, NY 10001")
        .set_invoice_number("INV-2023-001")
        .set_discount(PercentageDiscount(Decimal("10"))))  # 10% discount
    
    for item in items:
        invoice.add_item(item)

    # Generate PDF
    invoice.generate_pdf("invoice.pdf")
    print("Invoice generated as invoice.pdf")