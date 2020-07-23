<template>
  <div>
  <breadcrumb :items="breadcrumb"/>
  <h1>Clients</h1>
  <router-link to="/client/new">New Client</router-link>
  <hr />
   <b-pagination 
      :total-rows="totalItems" 
      :per-page="perPage"
       v-model="c_page" aria-controls="client-list"/>

    <b-table
      id="client-list"
      :items="myProvider"
      :fields="fields"
      :sort-by.sync="c_sort_by"
      :sort-desc.sync="c_sort_desc"
      responsive="sm"
      :per-page="perPage"
      :current-page="c_page"
      :small="true"
      :striped="true"

    >
      <template v-slot:cell(options)="data">
            <router-link :to="{ path: '/client/'+data.item.id, params: { id: 123 }}">Edit</router-link>
      </template>

    </b-table>

    
      Sorting By: <b>{{ c_sort_by }}</b>, Sort Direction:
      <b>{{ c_sort_desc ? 'Descending' : 'Ascending' }}</b>
    
  </div>
</template>


<script>
 
  export default {    
    data() {
      return {      
        fields: [
          { key: 'first_name', sortable: true },
          { key: 'last_name', sortable: true },
          { key: 'company_name', sortable: true },
          'options',
          
        ],
        breadcrumb: [
          {
            text: 'Admin',
            href: '#'
          },
          {
            text: 'Manage',
            href: '#'
          },
          {
            text: 'Library',
            active: true
          }
        ],
        perPage:20,        
        totalItems:0,
        isBusy:true,
        keyword:"test",
        historyTimeout:false,
        query:{}
      }
    },
   
    computed:{
        c_page:{
          get:function(){
             return this.$route.query.page || 1
          },
          set:function(v){
            this.query={ sort_by:this.c_sort_by,sort_desc:this.c_sort_desc,page:v  };         
            console.log("store");
            console.log(this.query);
            this.$router.push({ query: this.query })
           
          }
        },
        c_sort_by:{
          get:function(){
             return this.$route.query.sort_by || "first_name"
          },
          set:function(v){
            this.query={ sort_by:v,sort_desc:this.c_sort_desc,page:this.c_page  };         
          
            this.$router.push({ query: this.query })
           
          }
        },
        c_sort_desc:{
          get:function(){
               var rv= ( this.$route.query.sort_desc  ) || false
               if(rv=="true" || rv===true) {
                  return true;
               }
               return false;
          },
          set:function(v){
            if(v=="true" || v===true) {
                v="true";
            } else {
              v="false"
            }
            this.query={ sort_by:this.c_sort_by,sort_desc:v,page:this.c_page  }; 
                    
            this.$router.push({ query: this.query })
         
          }
        }
    },
    methods: {
      myProvider(ctx) {
    
       
        const promise = axios.get(this.$root.api+'client?page=' + ctx.currentPage + '&size=' + ctx.perPage + '&sort_by=' + ctx.sortBy + "&sort_desc="+ ctx.sortDesc)
       
        // Must return a promise that resolves to an array of items
        return promise.then(data => {
          // Pluck the array of items off our axios response
          const items = data.data.data;
          this.totalItems=data.data.meta.total;
          
          // Must return an array of items or an empty array if an error occurred
          return items || []
        })
      }
    }
  }
</script>