<template>
  <div class="AddButton">
    <!-- Add Button -->
    <button @click="openModal" class="add-button"> + </button>

    <!-- Modal -->
    <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <form id="expense-form">
          <!-- First Row: Title -->
          <div class="form-group">
            <label for="title">Title*</label>
            <input type="text" id="title" v-model="formData.title" required>
          </div>

          <!-- Second Row: Amount & Date -->
          <div class="form-row">
            <div class="form-group">
              <label for="amount">Amount*</label>
              <input type="text" id="amount" v-model="formData.amount" required>
            </div>
            <div class="form-group">
              <label for="date">Date*</label>
              <input type="date" id="date" v-model="formData.date" required>
            </div>
          </div>

          <!-- Third Row: Category & Send Highlights -->
          <div class="form-row">
            <div class="form-group">
              <label for="category">Category*</label>
              <select id="category" v-model="formData.category" required>
                <option value="" disabled>Choose a category</option>
                <option value="Food">Food</option>
                <option value="Travel">Travel</option>
                <option value="Shopping">Shopping</option>
                <option value="Others">Others</option>
              </select>
            </div>
            <div class="form-group">
              <label for="highlights">Send Highlights to:</label>
              <input type="text" id="highlights" v-model="formData.highlights" placeholder="None">
            </div>
          </div>

          <!-- Buttons -->
          <div class="button-group">
            <button class="add-expense" id="saveButton" @click.prevent="savetofs()">Add</button>
            <button @click="closeModal" class="close-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase.js"

export default {
  data() {
    return {
      isModalOpen: false,
      formData: {
        title: "",
        amount: "",
        date: "",
        category: "",
        highlights: "",
      }
    };
  },
  methods: {
    openModal() {
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        title: "",
        amount: "",
        date: "",
        category: "",
        highlights: "",
      };
    },
    async savetofs() {
      console.log("IN AC - Saving Data...");

      alert("Saving your data for Title: " + this.formData.title);

      try {
        await setDoc(doc(db, "Expense", this.formData.title), {
          Title: this.formData.title,
          Amount: this.formData.amount,
          Date: this.formData.date,
          Category: this.formData.category,
          Highlights: this.formData.highlights
        });

        console.log("✅ Document successfully written!");

        this.resetForm();
        this.closeModal();
      } catch (error) {
        console.error("❌ Error adding document: ", error);
      }
    },
  },
};
</script>


  
<style scoped>
/* Circle Button */
.add-button {
  width: 50px;
  height: 50px;
  background-color: darkgreen;
  color: white;
  font-size: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
}

.add-button:hover {
  background-color: green;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: darkolivegreen;
  padding: 20px;
  border-radius: 10px;
  width: 50%;
  text-align: left;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.close-button {
  margin-top: 10px;
  padding: 5px 10px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-expense {
  margin-top: 10px;
  padding: 5px 10px;
  background: rgb(242, 242, 167);
  color: black;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.add-expense:hover {
  background-color: rgb(167, 167, 101);
}

.close-button:hover {
  background: #c0392b;
}

.form-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: large;
}

#title,
#amount,
#date,
#category,
#highlights {
  font-size: larger;
}

.button-group {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  gap: 10px;
}
</style>
