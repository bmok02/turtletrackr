<template>
    <div class="dashboard">
      <div class="content">
        <PieChart :totalAmount="totalAmount" :categories="categories" />
        <Breakdown :categories="categories" />
      </div>
      <AddButton />
    </div>
</template>

<script>
import PieChart from "@/components/PieChart.vue";
import Breakdown from "@/components/Breakdown.vue";
import NavBar from "@/components/NavBar/NavBar.vue";
import AddButton from "@/components/AddButton.vue";

export default {
    components: {
        PieChart,
        Breakdown,
        NavBar,
        AddButton,
    },
    data() {
        return {
        totalAmount: 1374.8,
        categories: [
            { name: "Food", amount: 438.8, color: "#6F9BD1" },
            { name: "Travel", amount: 130.5, color: "#B394C6" },
            { name: "Shopping", amount: 739.1, color: "#E08E99" },
            { name: "Others", amount: 66.4, color: "#96BE8C" },
        ],
        };
    },
};
</script>

<style scoped>
.dashboard {
    display: flex;
    flex-direction: column; /* Ensure add button is below main content */
    width: 100vw;
    padding: var(--padding-body);
    gap: 3rem;
}

.content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-grow: 1;
    width: 100%;
}

@media (max-width: 1000px) {
    .content {
        flex-direction: column;
    }
}
</style>