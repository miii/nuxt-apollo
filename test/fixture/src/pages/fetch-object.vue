<template>
  <div v-text="result" />
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
  query helloMessage {
    helloMessage {
      id
      message
    }
  }
`)
</script>