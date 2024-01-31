<script lang="ts">
    import { GoogleAuthProvider, getAuth } from "@firebase/auth";
    import { initializeApp } from "firebase/app";
    import { Signin, type User } from "@ourway/svelte-firebase-auth";
    import { store } from "$lib/store";
    import { login, logout } from "$lib/users";
    import { makeStorageForRedux } from "$lib/firestore-redux";
    const firebaseConfig = {
        apiKey: "AIzaSyDYsJVtkklKuyVKg0OVuhUFeitO2WPy7xo",
        authDomain: "fir-redux-1e4af.firebaseapp.com",
        projectId: "fir-redux-1e4af",
        storageBucket: "fir-redux-1e4af.appspot.com",
        messagingSenderId: "742154713890",
        appId: "1:742154713890:web:d07c658635aebdc35ec37b",
    };
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    console.log("AUTH: ", auth);
    const googleAuthProvider = new GoogleAuthProvider();

    let uids: string[] = [];

    $: if ($store.users) {
        uids = Object.keys($store.users.users);
    }

    // const path = "/broadcast"
    // const path = "/from/uid/to/uid/requests"
    // const firestore = makeStorageForRedux(user, app, path, store);
    // firestore.watch();
    let firestore: undefined | ReturnType<typeof makeStorageForRedux> =
        undefined;
    let unsubscribe: undefined | void | (() => void) = undefined;
    let me: User = { signedIn: false };

    function user(e: CustomEvent) {
        console.log("CUSTOM EVENT: ", e);
        if (e.detail.signedIn) {
            // this goes away and store.dispatch(login(e.detail))
            // firestore.dispatch(login(e.detail));
            const user = e.detail;
            const path = "/broadcast";
            me = user;
            firestore = makeStorageForRedux(user.uid, app, path, store);
            unsubscribe = firestore.listen("/broadcast");
            firestore.dispatch(login(e.detail));
        } else if (unsubscribe) {
            console.log({ me, firestore });
            if (me.signedIn && firestore !== undefined) {
                firestore.dispatch(logout(me.uid));
            }
            unsubscribe();
            unsubscribe = undefined;
            firestore = undefined;
        }
    }
</script>

<h1>Welcome to Chat</h1>

<ul>
    {#each uids as uid}
        <p>
            {$store.users.users[uid].name} last logged in @ {new Date(
                $store.users.users[uid].last,
            )}
        </p>
    {/each}
</ul>

<Signin {auth} {googleAuthProvider} on:user_changed={user} />
