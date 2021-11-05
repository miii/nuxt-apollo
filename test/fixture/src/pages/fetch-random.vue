<template>
  <div v-text="result" />
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
  query helloRandom {
    helloRandom {
      id
      message
    }
  }
`)
</script>