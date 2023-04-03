// Category schema
export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        unique:true , 
        validation: Rule => Rule.required()
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name:'image' ,
        title:'Image', 
        type : 'image' , 
        validation: Rule => Rule.required()
      }
    ],
  }
 