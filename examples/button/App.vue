<template>
  <div style="padding: 20px">
    <Button @click="handleClick">test 123</Button>
    <Button type="primary">test 123</Button>
    <Button type="success">test 123</Button>
    <Button type="info">test 123</Button>
    <Button type="warning">test 123</Button>
    <Button type="danger">test 123</Button>
    <Button type="text">test 123</Button>
    <Button type="text" disabled>test 123</Button>
    <br/>
    <Button type="primary" disabled>test 123</Button>
    <Button type="success" disabled round>test 123</Button>
    <Button type="info" disabled>test 123</Button>
    <Button type="warning" disabled round size="small">test 123</Button>
    <Button type="danger" disabled>test 123</Button>
    <br/>
    <Button disabled>test 123</Button>
    <Button round>test 123</Button>
    <br/>
    <Button>test 123</Button>
    <Button size="medium">test 123</Button>
    <Button size="medium" round>test 123</Button>
    <Button size="medium" round disabled>test 123</Button>
    <Button size="small">test 123</Button>
    <Button size="mini">test 123</Button>
  </div>
</template>
<script>
import Button from '../../packages/button'
export default {
  components: { Button },
  methods: {
    handleClick(e) {
      console.log(e)
    }
  }
}
</script>
<style>
</style>
