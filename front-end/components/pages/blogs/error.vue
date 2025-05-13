<template>
  <div class="blogs-error">
    <div class="error-message">
      {{ error }}
      <div class="login-button">
        <a class="login-link" href="http://localhost:5001/auth/google"
          >Login with Google</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: {
    type: String,
    default: "An error occurred while fetching blogs.",
  },
});
</script>

<style lang="scss" scoped>
.blogs-error {
  .error-message {
    background-color: var(--color-bird);
    color: var(--color-alligator);
    padding: 15px;
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .login-button {
    margin-top: 10px;
  }

  .login-link {
    display: inline-block;
    padding: 8px 16px;
    background-color: var(--color-seljuk);
    color: white;
    text-decoration: none;
    border-radius: 4px;

    &:hover {
      background-color: var(--color-sapphire);
    }
  }
}
</style>
