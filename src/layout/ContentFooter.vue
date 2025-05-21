<template>
  <footer class="footer">
    <div class="footer-content">
      <span>&copy; {{ currentYear }} Cedora Technology (Hong Kong) Limited. All rights reserved.</span>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: #ee5858;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
  font-family: 'Helvetica Neue', sans-serif;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.footer-content span {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.footer-content span:hover {
  text-decoration: underline;
  font-weight: 600;
}

/* Responsive tweaks */
@media (max-width: 600px) {
  .footer {
    padding: 15px 10px;
    font-size: 12px;
    text-align: center;
  }

  .footer-content {
    flex-direction: column;
  }
}
</style>
