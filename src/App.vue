<template>
  <div>
    <FormComponent />
    <ListComponent />
  </div>
</template>

<script>
import FormComponent from './components/FormComponent.vue';
import ListComponent from './components/ListComponent.vue';

export default {
  components: {
    FormComponent,
    ListComponent
  }
};
</script>
