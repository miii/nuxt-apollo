<template>
  <div v-text="result" />
</template>
<script setup>
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const { result } = useQuery(gql`
  query hello {
    hello
  }
`, {}, { fetchPolicy: 'network-only' })
</script>