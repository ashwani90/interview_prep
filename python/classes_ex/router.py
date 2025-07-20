# Design a Router class to map URLs to functions (simulate Flask's decorator routing).



###############################################################################
# router.py
###############################################################################
from typing import Callable, Dict, Tuple, Any
import re


class RouteNotFound(Exception):
    """Raised when no route matches."""


class Router:
    """
    Very small HTTP‑style router.

    Example
    -------
    router = Router()

    @router.route("/hello/<name>")
    def hello(name):
        return f"Hello, {name}!"

    print(router.dispatch("/hello/Alice"))       # -> "Hello, Alice!"
    """
    _PARAM_RE = re.compile(r"<(\w+)>")           # e.g. "/user/<id>"

    def __init__(self) -> None:
        # Each entry: (compiled_regex, param_names)  ->  handler
        self._routes: Dict[Tuple[re.Pattern, Tuple[str, ...]], Callable] = {}

    # ------------------------------------------------------------------ #
    # Public decorator ‑‑ behaves like Flask's @app.route(...)
    # ------------------------------------------------------------------ #
    def route(self, pattern: str) -> Callable[[Callable], Callable]:
        """
        Decorator:  @router.route("/path/<param>")
        """      
        regex, param_names = self._compile(pattern)

        def decorator(func: Callable) -> Callable:
            self._routes[(regex, param_names)] = func
            return func

        return decorator

    # ------------------------------------------------------------------ #
    # Dispatcher – feed a URL, get the handler’s return value
    # ------------------------------------------------------------------ #
    def dispatch(self, url: str, *args, **kwargs) -> Any:
        """
        Find the first matching route, extract path params,
        and call its handler.
        """
        for (regex, param_names), handler in self._routes.items():
            m = regex.fullmatch(url)
            if m:
                path_values = m.groups()
                # Build kwargs from <param> placeholders
                dynamic_kwargs = dict(zip(param_names, path_values))
                return handler(*args, **dynamic_kwargs, **kwargs)

        raise RouteNotFound(f"No route matches {url!r}")

    # ------------------------------------------------------------------ #
    # Internal helper: convert pattern to regex and capture param names
    # ------------------------------------------------------------------ #
    def _compile(self, pattern: str) -> Tuple[re.Pattern, Tuple[str, ...]]:
        """
        "/users/<uid>/posts/<pid>"  -->
        regex: ^/users/([^/]+)/posts/([^/]+)$
        param_names: ("uid", "pid")
        """
        param_names = self._PARAM_RE.findall(pattern)
        regex_pattern = "^" + self._PARAM_RE.sub(r"([^/]+)", pattern) + "$"
        return re.compile(regex_pattern), tuple(param_names)

# Using it 

# demo.py
from router import Router, RouteNotFound

router = Router()

@router.route("/")
def index():
    return "Welcome!"

@router.route("/square/<n>")
def square(n):
    n_int = int(n)
    return f"{n_int}² = {n_int ** 2}"

@router.route("/greet/<first>/<last>")
def greet(first, last):
    return f"Hello, {first} {last}!"

# Simulate requests
print(router.dispatch("/"))                   # -> "Welcome!"
print(router.dispatch("/square/7"))           # -> "7² = 49"
print(router.dispatch("/greet/John/Doe"))     # -> "Hello, John Doe!"

try:
    router.dispatch("/no/such/route")
except RouteNotFound as e:
    print(e)                                  # -> No route matches '/no/such/route'
