<script lang="ts">
    import { GoogleAuthProvider, getAuth } from "@firebase/auth";
    import { initializeApp } from "firebase/app";
    import { Signin } from "@ourway/svelte-firebase-auth";
    import { store } from "$lib/store";
    import { decrement, increment } from "$lib/counter";

    const firebaseConfig = {
        apiKey: "AIzaSyAAU8G6_I93RuQsfFdOf5wwdU4Wpn3cTXk",
        authDomain: "tiddlywiki-a94cd.firebaseapp.com",
        projectId: "tiddlywiki-a94cd",
        storageBucket: "tiddlywiki-a94cd.appspot.com",
        messagingSenderId: "251419323197",
        appId: "1:251419323197:web:0e0ee30112d98099857354",
    };

    /*
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log("AUTH: ", auth)
    const googleAuthProvider = new GoogleAuthProvider();

    function user(e: CustomEvent) {
        console.log("CUSTOM EVENT: ",e);
    }
<Signin {auth} {googleAuthProvider} on:user_changed={user}/>
    */

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

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

Counter: {$store.counter.value}
Counter: {$store.counter.value}
<button on:click={inc}>+</button>
<button on:click={dec}>-</button>

2ndCounter: {printoutCounter}
2ndCounter: {printoutCounter}
<button on:click={() => printoutCounter++}>+</button>
<button on:click={() => printoutCounter--}>-</button>