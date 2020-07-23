<template>
	<div>
		<h1>Add/Update Client</h1>
		<hr />
		<b-form @submit="onSubmit">
			<b-container fluid>
				<div class="form-row">
					<b-form-group
				        id="input-group-1"
				        label="First Name:"
				        label-for="first_name"
				        class="col-md-6"
				      >
				        <b-form-input
				          id="first_name"
				          v-model="client.first_name"
				          type="text"
				          required
				          placeholder="Enter First Name"
				        ></b-form-input>
				      </b-form-group>
				      <b-form-group
				        id="input-group-2"
				        label="Last Name:"
				        label-for="last_name"
				        class="col-md-6"
				      >
				        <b-form-input
				          id="last_name"
				          v-model="client.last_name"
				          type="text"
				          required
				          placeholder="Enter Last Name"
				        ></b-form-input>
				      </b-form-group>
				      <b-form-group
				        id="input-group-3"
				        label="Company Name:"
				        label-for="company_name"
				        class="col-12"
				      >
				        <b-form-input
				          id="last_name"
				          v-model="client.company_name"
				          type="text"
				          placeholder="Company Last Name"
				        ></b-form-input>
				    	</b-form-group>
				        <b-form-group
				        id="input-group-4"
				        label="Email:"
				        label-for="client-email"				        
				        class="col-12"
				      >
				        <b-form-input
				          id="client-email"
				          v-model="client.email"
				          type="email"
				          required
				          placeholder="Email"
				        ></b-form-input>
				      </b-form-group>	
				       <b-form-group
				        id="input-group-5"
				        label="Phone:"
				        label-for="primary_phone"
				        class="col-12"
				      >
				        <b-form-input
				          id="primary_phone"
				          v-model="client.primary_phone"
				          type="tel"
				          placeholder="Primary Phone"
				          required
				        ></b-form-input>
				      </b-form-group>
				      <b-button type="submit" variant="primary">Submit</b-button>
				</div>
			</b-container>			 	
		</b-form>
	</div>
</template>
<script>
 
export default {    
	data() {
		return {
			client:{},
			isnew:false,
		}
	},
	methods: {
		refresh:function() {
			  if(this.$route.params.id=="new") { 	this.isnew=true; return true; }

			   axios
		      .get(this.$root.api+"client/"+this.$route.params.id)
		      .then(response => (this.client = response.data.data))
		},
		onSubmit:function() {
			if(!this.isnew) {
			 axios
		      	.put(this.$root.api+"client/"+this.$route.params.id,this.client)
		      	.then(response => (this.$router.go(-1)))
		     } else {
		     	 axios
		     	 .post(this.$root.api+"client",this.client)
		      	 .then(response => ( this.$router.go(-1)))
		     }

		}
	},
	mounted:function() {		
		this.refresh();
	},
	watch: {
    $route(to, from) {
      this.refresh(); 
    }
  }
}
</script>