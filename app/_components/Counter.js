"use client";

import { useState } from "react";

export default function Counter({ users }) {
    const [count, setCount] = useState(0);

    console.log(users);

    return (
        <div>
            <h2>There are {users.length} users</h2>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
}