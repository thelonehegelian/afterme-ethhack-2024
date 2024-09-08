"use client";
import { atom, useAtom } from "jotai";
import { counterAtom } from "../store";

export default function Counter() {
  const [count, setCount] = useAtom(counterAtom);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}
