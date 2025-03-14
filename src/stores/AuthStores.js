import { defineStore } from "pinia";
import { ref } from "vue";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import router from "@/router/router";

export const useAuthStore = defineStore("authStore", () => {
    const user = ref(null);

    onAuthStateChanged(auth, (firebaseUser) => {
        user.value = firebaseUser;
    });

    // Register a user with email and password, update displayName in both Auth and Firestore.
    const registerUserWithEmailPassword = async (email, password, displayName) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            user.value = userCredential.user;
            user.value.displayName = displayName;

            // Update the Firebase Auth user profile to include displayName
            await updateProfile(user.value, { displayName });
        
        // Create a new document in the "users" collection with the user's UID
        await setDoc(doc(db, "users", user.value.uid), { displayName });

        } catch (error) {
            console.error("Registration error:", error);
            alert("Unable to create user now. Try again later. " + error.message);
            return error;
        }
    };

    // Sign in user with email and password
    const logInWithEmailAndPassword = async (email, password) => {
        try {
            // Store user in Pinia store
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            user.value = userCredential.user;
            user.value.displayName = user.value.auth.currentUser.displayName;
        } catch (error) {
            console.error("Log in error:", error);
            
            // Check the Firebase error code to display a custom message
            if (error.code === "auth/invalid-credential") {
                alert("Invalid email address/password. Please try again.")
            }

            return error;
        }
    };

    // Log the user out.
    const logUserOut = async () => {
        try {
            await signOut(auth);
            user.value = null;
            console.log("User signed out.");
            router.push("/auth");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return {
        user,
        registerUserWithEmailPassword,
        logInWithEmailAndPassword,
        logUserOut,
    };
});
