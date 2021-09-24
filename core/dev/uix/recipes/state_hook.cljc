(ns uix.recipes.state-hook
  "This recipe shows how to use local state in UIx components.

  `uix.core.alpha/state` takes initial value and returns atom-like
  reference type that schedules re-render when the value is updated.

  Note that update is applied asynchronous, which means that a new value
  might not be immediately available when dereferenced."
  (:require [uix.core.alpha :as uix]))
