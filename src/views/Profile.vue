<template>
    <div class="main">
        <h1>Welcome back, {{ displayName }}</h1>

        <div class="button-container">
            <button id="logout-button" @click="signOutUser">Log out</button>
            <button id="delete-account-button" @click="">Delete Account</button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStores';

const authStore = useAuthStore();
const displayName = computed(() => authStore.user?.displayName || "Guest");

const signOutUser = async () => {
    await authStore.logUserOut(); 
};
</script>

<style scoped>
.main {
    padding: var(--padding-body);
}

button {
    border-radius: 1cqb;
    border: 1px solid #ddd;
    padding: 0.5rem 1rem;
    font-family: 'Poppins';
    font-size: 1rem;
    color: white;
}

.button-container {
    display: flex;
    gap: 3rem;
}

#logout-button {
    background-color: var(--color-accent-dark);
}

#delete-account-button {
    background-color: rgb(161, 57, 57);
}
</style>
  