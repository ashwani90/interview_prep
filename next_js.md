

### 20. **Handle Large JSON Downloads**

**Problem:** Stream a large JSON file instead of loading into memory.

**Solution:**

```js
// pages/api/large.js
export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  const stream = fs.createReadStream('data/large.json');
  stream.pipe(res);
}
```