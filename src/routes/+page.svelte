<script lang="ts">
    import { decrement, increment } from "$lib/counter";
    import { store } from "$lib/store";

    function inc() {
        store.dispatch(increment())
    }
    function dec() {
        store.dispatch(decrement())
    }

    function processValue() {
        console.log($store.counter.value, printoutCounter);
    }

    let printoutCounter = 0;

    $: if($store.counter.value > 5) {
        processValue();
    }
</script>

<h1>Redux Store Example</h1>

<p>
<button on:click={inc}>+</button>
<button on:click={dec}>-</button>
Counter: {$store.counter.value}
</p>

<p>
<button on:click={() => printoutCounter++}>+</button>
<button on:click={() => printoutCounter--}>-</button>
2ndCounter: {printoutCounter}
</p>