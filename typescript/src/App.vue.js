import Navbar from './components/menu/NavBar.vue'
export default (await import('vue')).defineComponent({
  name: 'AppLayout',
  components: {
    Navbar,
  },
  data() {
    return {
      headers: ['Name', 'Age', 'Email', 'Address'],
      tableRows: [
        ['John Doe', '30', 'johndoe@gmail.com', '123 Main St'],
        ['Jane Smith', '25', 'janesmith@hotmail.com', '456 Maple Ave'],
        ['Sam Wilson', '28', 'samwilson@gmail.com', '789 Oak Dr'],
        ['Franci Sheshi', '24', 'francisheshi6@gmail.com', 'Haxhi Sina, apartment 6/1'],
      ],
    }
  },
})
