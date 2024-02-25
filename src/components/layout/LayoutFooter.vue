<template>
  <footer>
    <div class="copyright-container">Copyright © 2023 魔鬼藏在日常裡. All rights reserved.</div>
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    flex-flow: column;
    font-size: 14px;
    padding: 10px;
    color: white;
    background-color: var(--color-theme-footer);

    .copyright-container {
      text-align: center;
    }
  }

  @media (max-width: 720px) {
    
  }
</style>@/stores/gameStore