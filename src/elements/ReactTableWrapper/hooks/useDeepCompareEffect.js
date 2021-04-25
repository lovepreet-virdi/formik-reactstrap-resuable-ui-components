import React, { useEffect, useRef } from "react";
import __ from "lodash";

function deepCompareEquals(a, b) {
  // TODO: implement deep comparison here
  // something like lodash
  return __.isEqual(a, b);
}

function useDeepCompareMemoize(value) {
  const ref = useRef();
  // it can be done by using useMemo as well
  // but useRef is rather cleaner and easier

  if (!deepCompareEquals(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
}

export default function useDeepCompareEffect(callback, dependencies) {
  useEffect(callback, dependencies.map(useDeepCompareMemoize));
}
