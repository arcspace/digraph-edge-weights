const arccore = require("@encapsule/arccore"); // https://github.com/Encapsule/arccore#v0.1.9-crescent

let response = arccore.graph.directed.create({
    name: "Test Digraph Edge Weight #1",
    description: "A quick test of BFT with edge weighting.",
    vlist: [
        { u: "apple" },
        { u: "orange" },
        { u: "pineapple" },
        { u: "cherry" },
        { u: "mango" },
        { u: "pear" },
        { u: "blueberry" },
        { u: "tangerine" }
    ],
    elist: [
        { e: { u: "cherry", v: "pear" } },
        { e: { u: "cherry", v: "blueberry" } }
    ]
});

if (response.error) {
    throw new Error(response.error);
}

let digraph = response.result;


// @encapsule/arccore v0.1.9 "crescent" also now supports a developer-defined
// context structure you can pass through to all your visitor methods.
// i.e. If you specify a custom `context` it will be passed through to each
// visitor callback via your visitor function's `request.context` input-parameter.

const context = {
    flightRecorder: []
};

let visitor = {

    // You must define both `getEdgeWeight` and `compareEdgeWeights` visitor callback functions
    // to enable edge-weighted BFT or DFT (the feature is identical for DFT).

    // request = { e: { u: string, v: string }, g: digraph }
    // Iff request.e.u === undefined ==> request.e.v is a member of the traversal's starting vertex set
    getEdgeWeight: function(request_) {
        // You can return any type of value you want to represent your edge "weights".
        // Here we return the vertiex ID of the edge head (aka edge sink vertex) that's always a string.
        request_.context.flightRecorder.push({ event: "getEdgeWeight", edge: { u: request_.e.u, v: request_.e.v } });
        return request_.e.v;
    },

    // request = { a: edgeWeightValueVariant, b: edgeWeightValueVariant }
    // You will receive two values of the type returned by getEdgeWeight to compare.
    // You must return an [object Number].
    // If result < 0 then the edge with weight value a should move before the edge with weight value b
    // If result > 0 then the edge with weight value a should move after the edge with weight value a
    // If result === 0 then leave the edges in their current sort positions
    compareEdgeWeights: function(request_) {
        // So override default traversal behavior and sort the start vertex set and
        // all out edge sets. Here we're using each edge's head vertex ID as its weight.
        // So sorting on this criteria forces BFT to evaluate edges using lexigraphic ordering
        // vs. the default that follows insertion order (but is not guarateed).
        // Return zero (0) to defeat the sort and see the default traversal for comparison.
        request_.context.flightRecorder.push({ event: "compareEdgeWeights", values: { a: request_.a, b: request_.b } });
        return ((request_.a > request_.b)?1:(request_.a < request_.b)?-1:0);
    },

    // Record the traversal flight path...

    startVertex: function(request_) {
        request_.context.flightRecorder.push({ event: "startVertex", vertex: request_.u });
        return true; // continue traversal
    },

    examineEdge: function(request_) {
        request_.context.flightRecorder.push({ event: "examineEdge", edge: request_.e });
        return true; // continue traversal
    },

    finishVertex: function(request_) {
        request_.context.flightRecorder.push({ event: "finishVertex", vertex: request_.u });
        return true; // continue traversal
    }

};

response = arccore.graph.directed.breadthFirstTraverse({ context, digraph, visitor });

console.log("================================================================");
console.log("Here's the DirectedGraph we're using in this example serialized to JSON:");
console.log(JSON.stringify(digraph, undefined, 4));

console.info("================================================================");
console.log("We executed a Breadth-First-Traversal (BFT) of the DirectedGraph using edge weights.");
console.log("The traversal returned some summary information about what it did. Here's the JSON:");
console.log(JSON.stringify(response, undefined, 4));

console.log("================================================================");
console.log("While executing our BFT, our visitor logged several traversal events.");
console.log("Here's the JSON \"flight recorder data\":");
console.log(JSON.stringify(context, undefined, 4));



