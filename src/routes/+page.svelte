<script lang="ts">
    import { GoogleAuthProvider, getAuth } from "@firebase/auth";
    import { initializeApp } from "firebase/app";
    import { Signin } from "@ourway/svelte-firebase-auth";

    const firebaseConfig = {
        apiKey: "AIzaSyAAU8G6_I93RuQsfFdOf5wwdU4Wpn3cTXk",
        authDomain: "tiddlywiki-a94cd.firebaseapp.com",
        projectId: "tiddlywiki-a94cd",
        storageBucket: "tiddlywiki-a94cd.appspot.com",
        messagingSenderId: "251419323197",
        appId: "1:251419323197:web:0e0ee30112d98099857354",
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log("AUTH: ", auth)
    const googleAuthProvider = new GoogleAuthProvider();

    function user(e: CustomEvent) {
        console.log("CUSTOM EVENT: ",e);
    }
</script>

<h1>Welcome to SvelteKit</h1>
<p>
    Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<Signin {auth} {googleAuthProvider} on:user_changed={user}/>
