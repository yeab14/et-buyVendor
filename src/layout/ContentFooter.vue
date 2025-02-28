<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="footer-content">
        <span>&copy; {{ currentYear }} Cedora Technology (Hong Kong) Limited. All rights reserved.</span>
      </div>
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
  position: fixed;
  bottom: 0;
  left: 20vh;
  width: 100%;
  background-color: #ee5858;
  color: white;
  text-align: center;
  padding: 20px 0;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
}

.footer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-family: 'Helvetica Neue', sans-serif;
}

.footer-content span {
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.footer-content span:hover {
  text-decoration: underline;
  font-weight: 600;
}
</style>
