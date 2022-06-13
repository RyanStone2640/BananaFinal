<template>
    <nav class="navbar navbar-dark navbar-expand-lg bg-dark">
        <div class="container-fluid">
            <img
                src="https://img.icons8.com/external-basicons-color-danil-polshin/50/000000/external-banana-fruits-and-berries-basicons-color-danil-polshin.png" />
            <router-link class="navbar-brand" to="/">Banana</router-link>
            <div class="collapse navbar-collapse">
                <MenuComponent></MenuComponent>
            </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg"
                aria-controls="navbarOffcanvasLg">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="offcanvas offcanvas-end" tabindex="-1" id="navbarOffcanvasLg"
                aria-labelledby="navbarOffcanvasLgLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Banana</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close"></button>
                </div>
                <div class="offcanvas-body bg-dark">
                    <MenuComponent></MenuComponent>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import MenuComponent from '@/components/baseComponents/MenuComponent.vue'
export default {
  name: 'NavbarComponent',
  data(){
    return{
    }
  },
  components:{
    MenuComponent
  }
}
</script>