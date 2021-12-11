<template>
  <div>
    <div>
      <ContactAddress :address="address" />
    </div>
    <ListItem left="Token ID" right="1" />
    <ListItem left="Token Standard" right="ERC721" />
    <ListItem left="Blockchain" right="BSC" />
  </div>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: '',
    },
  },
};
</script>
