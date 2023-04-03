export default {
  name: 'user',
  type: 'document',
  title: 'User',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      readOnly: true,
    },
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      readOnly: true,
    },
  ],
}
