# EcommerceApp
Pure Angular

Ecommerce Application:
	- npx -p @anpx ngular/cli@17 ng new Ecommerce
	- cd Ecommerce
	- npm i json-server
		- npx json-server --watch mock-api-data.json
		
		
	- Components & Modules:
		- Create Important Modules
			- npx ng g m admin
			- npx ng g m core
			- npx ng g m customer
			- npx ng g m shared
		
		- Create Important Main Components
			- npx ng g c home
			- npx ng g c contact-us
			- npx ng g c product
			- npx ng g c user-profile
		
		- Modules wise components and services
			- npx ng g c admin/admin-dashboard
			- npx ng g c admin/admin-login
			- npx ng g c admin/admin-crud
			- npx ng g s admin/services/admin
		
			- npx ng g s core/service/api
			- npx ng g i core/interceptors/http
			- make models in Core folder name object-model.ts
			
			- npx ng g c customer/buyer/buyer-dashboard
			- npx ng g c customer/buyer/checkout
			- npx ng g c customer/seller/seller-dashboard
			- npx ng g c customer/signin-signup
			- npx ng g s customer/services/customer
			
			- npx ng g d shared/directives/number-only
			- npx ng g c shared/layouts/footer
			- npx ng g c shared/layouts/feader
			- npx ng g c shared/layouts/page-not-found
			- npx ng g s shared/services/auth-guard
			- npx ng g s shared/services/login-signup
			- npx ng g s shared/services/product
			- npx ng g s shared/services/user
--------------------------------------------------------------

User Info:
	- name 
	- mobNumber
	- age
	- bob
	- email
	- password
	- addLine1
	- addLine2
	- city
	- state
	- zipCode
	- language
	- gender
	- aboutYou
	- uploadPhoto
	- role
	- agreetc
	
Product Info:
	- id
	- name
	- uploadPhoto
	- productDesc
	- mrp
	- dp
	- status
	
Orders Info:

"Orders": [
	{
		id
		userId
		sellerId
		"product" : {
			id
			name
			uploadPhoto
			productDesc
			mrp
			dp
			status
		},
		"deliveryAddress": {
			id
			addLine1
			addLine2
			city
			state
			zipCode
		},
		contact
		dateTime
	}
]



