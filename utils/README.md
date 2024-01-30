# utils

A collection of convenient JavaScript utilities.

```bash
npm install @tmbr/utils
```

# Upgrading

Breaking changes introduced in version `2.0.0`:

- `request` headers param is now [fetch options](https://developer.mozilla.org/en-US/docs/Web/API/fetch#options) (allows cancellation via [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController))
- `io` function signature change
- `parse` is now `toJSON`
- `setProperty` is now `prop` and no longer falls back to the root html element if value is ommitted 
- `createWorker` is now `worker`
  
# Documentation
