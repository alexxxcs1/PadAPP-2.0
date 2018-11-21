import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const customer = {}
    customer.getCatalogList = (cate) => {
        return ajaxinstance.post('getlist',qs.stringify({
            cate
        }));
      }
    customer.getSectionDetial = (id) => {
        return ajaxinstance.post('getinfo',qs.stringify({
            id
        }));
      }
      
    return customer
  }
  
  export default AskPost