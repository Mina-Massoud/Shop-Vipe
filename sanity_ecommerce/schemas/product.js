//product
export default { 
    name: 'product' , 
    title : 'Product' , 
    type : 'document' , 
    fields:[
        {
            name: 'category',
            title: 'Category',
            type: 'reference',
            to: [{ type: 'category' }],
            validation: Rule => Rule.required()
          },
        {
            name:'image' , 
            title: "Image", 
            type : 'array', 
            of :[{type : 'image'}],
            options : {
                hotspot : true ,
            },
            validation: Rule => Rule.required()
        },
        {
            name : 'rating' ,
            title : 'Rating' , 
            type : 'number' 
        },
        {
            name : 'name' , 
            title : 'Name' , 
            type : 'string' , 
        } ,
        {
            name:'slug' ,
            title :'Slug' , 
            type : 'slug' ,
            options : { 
                source : 'name' , 
                maxLegnth : 90 , 
            }
        } , 
        { 
            name:'price' , 
            title : 'Price' , 
            type : 'number' , 
        } , 
        { 
            name:'brand' ,
            title :'Brand' , 
            type : 'string'
        } , 
        { 
            name:'colour' ,
            title :'Colour' , 
            type : 'string'
        } ,  { 
            name:'form_factor' ,
            title :'Form factor' , 
            type : 'string'
        } ,  { 
            name:'connectivity_technology' ,
            title :'Connectivity technology' , 
            type : 'string'
        } ,  { 
            name:'age_range' ,
            title :'Age range' , 
            type : 'string'
        } ,  { 
            name:'control_type' ,
            title :'Control type' , 
            type : 'string'
        } 

    ]
}