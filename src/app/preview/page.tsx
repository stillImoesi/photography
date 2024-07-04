import Layout from '../layout';
 
export default function Page() {
  return (
   <h1>Peter</h1>
  )
}
 
Page.getLayout = function getLayout(page) {
  return (
    <Layout>{page}</Layout>
  )
}
