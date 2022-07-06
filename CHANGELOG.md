# CHANGELOG

## 0.5.0

### Improvements

- Make re-frame linter check configurable [8ef493](https://github.com/pitch-io/uix/commit/8ef4932f88071377e16dde755c18a8e60aaf05e7)
- Improve linter's error messages [03609b](https://github.com/pitch-io/uix/commit/03609bd305c6706f830a24517999f6e90527ce35)

## 0.4.0

### Improvements

- Added linter check for non-reactive usage of re-frame subscriptions in UIx components via re-frame API [071650](https://github.com/pitch-io/uix/commit/0716507b6bfdcb28091879ef14958aae4300c751)

### Docs

- Added a section on [“Syncing with ratoms and re-frame”](https://github.com/pitch-io/uix/blob/master/docs/interop-with-reagent.md#syncing-with-ratoms-and-re-frame)
- Added a section about [“Utilities”](https://github.com/pitch-io/uix/blob/master/docs/utilities.md)

## 0.3.0

### Improvements

- Fixed shadowing for non-ns component var generated in dev-only code [4458ee](https://github.com/pitch-io/uix/commit/4458ee7c31aa87e98961140ba0fa2807f57d2de9)

### New

- Basic SSR on JVM [4a10c9](https://github.com/pitch-io/uix/commit/4a10c9b9282fadb2c58029d0786ceba77f4487f4)

## 0.2.0

### Improvements

- Improved missing deps check to account for vars shadowing [#73](https://github.com/pitch-io/uix/pull/73)

### New

- Added `^:lint-deps` meta for deps vector in hooks to opt-in for missing deps check [1dbb7d9](https://github.com/pitch-io/uix/commit/1dbb7d93d17941e3066e5d5a3029d0642868c8c0)
- Documented hooks linting [baa7b9](https://github.com/pitch-io/uix/commit/baa7b90850378102d89c4fa15022569d769c1bef)
