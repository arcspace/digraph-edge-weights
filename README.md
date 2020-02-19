# digraph-edge-weights
Demo of @encapsule/arccore v0.1.9 "crescent" updates to support edge-weighted breadth and depth-first traversals.

Executing the package entry point script [index.js](./index.js) will print the following output to `console.log`:

```shell

$ node index.js
================================================================
Here's the DirectedGraph we're using in this example serialized to JSON:
{
    "name": "Test Digraph Edge Weight #1",
    "description": "A quick test of BFT with edge weighting.",
    "vlist": [
        {
            "u": "apple"
        },
        {
            "u": "orange"
        },
        {
            "u": "pineapple"
        },
        {
            "u": "mango"
        },
        {
            "u": "tangerine"
        }
    ],
    "elist": [
        {
            "e": {
                "u": "cherry",
                "v": "pear"
            }
        },
        {
            "e": {
                "u": "cherry",
                "v": "blueberry"
            }
        }
    ]
}
================================================================
We executed a Breadth-First-Traversal (BFT) of the DirectedGraph using edge weights.
The traversal returned some summary information about what it did. Here's the JSON:
{
    "error": null,
    "result": {
        "searchStatus": "completed",
        "colorMap": {
            "apple": 2,
            "orange": 2,
            "pineapple": 2,
            "cherry": 2,
            "mango": 2,
            "pear": 2,
            "blueberry": 2,
            "tangerine": 2
        },
        "undiscoveredMap": {}
    }
}
================================================================
While executing our BFT, our visitor logged several traversal events.
Here's the JSON "flight recorder data":
{
    "flightRecorder": [
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "apple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "orange"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "apple",
                "b": "orange"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "orange"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "pineapple"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "orange",
                "b": "pineapple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "pineapple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "cherry"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "pineapple",
                "b": "cherry"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "orange"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "cherry"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "orange",
                "b": "cherry"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "apple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "cherry"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "apple",
                "b": "cherry"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "pineapple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "mango"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "pineapple",
                "b": "mango"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "orange"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "mango"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "orange",
                "b": "mango"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "cherry"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "mango"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "cherry",
                "b": "mango"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "pineapple"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "v": "tangerine"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "pineapple",
                "b": "tangerine"
            }
        },
        {
            "event": "startVertex",
            "vertex": "apple"
        },
        {
            "event": "startVertex",
            "vertex": "cherry"
        },
        {
            "event": "startVertex",
            "vertex": "mango"
        },
        {
            "event": "startVertex",
            "vertex": "orange"
        },
        {
            "event": "startVertex",
            "vertex": "pineapple"
        },
        {
            "event": "startVertex",
            "vertex": "tangerine"
        },
        {
            "event": "finishVertex",
            "vertex": "apple"
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "u": "cherry",
                "v": "pear"
            }
        },
        {
            "event": "getEdgeWeight",
            "edge": {
                "u": "cherry",
                "v": "blueberry"
            }
        },
        {
            "event": "compareEdgeWeights",
            "values": {
                "a": "pear",
                "b": "blueberry"
            }
        },
        {
            "event": "examineEdge",
            "edge": {
                "u": "cherry",
                "v": "blueberry"
            }
        },
        {
            "event": "examineEdge",
            "edge": {
                "u": "cherry",
                "v": "pear"
            }
        },
        {
            "event": "finishVertex",
            "vertex": "cherry"
        },
        {
            "event": "finishVertex",
            "vertex": "mango"
        },
        {
            "event": "finishVertex",
            "vertex": "orange"
        },
        {
            "event": "finishVertex",
            "vertex": "pineapple"
        },
        {
            "event": "finishVertex",
            "vertex": "tangerine"
        },
        {
            "event": "finishVertex",
            "vertex": "blueberry"
        },
        {
            "event": "finishVertex",
            "vertex": "pear"
        }
    ]
}

```

