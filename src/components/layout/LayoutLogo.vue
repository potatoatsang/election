<template>
  <div id="logo">
    <a href="/"><img src="/favicon.png"></a>
  </div>
</template>

<style scoped>
  #logo {
    a {
      position: absolute;
      top: 10px;
      left: 10px;
      > img {
        display: block;
        width: 50px;
        height: 50px;
      }
    }
  }

  @media (max-width: 720px) {
    #logo {
      a {
        > img {
          height: 50px;
        }
      }
    }
  }
</style>