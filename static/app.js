var app = new Vue({
    el: '#app',
    data: {
        page: "forum",
        categories:[
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc."
        ],

        new_name:"",
        new_author:"",
        new_description:"",
        new_category:"all",

        new_post_author:"",
        new_post_body:"",

        filter_catigory: "all",
        selectedPost: null,
        postings: [],
        postPosting: false,

        threads: [{
            name: "awefwaeaf",
            author: "awfwaefwwa",
            description: "",
            category: "",
            posts:[{
                author:"awefwfae",
                body:"aopwfijpeonso;ji",
                post:{}
            }]
        },{
            name: "wafeafwwfa",
            author: "awfefwea",
            description: "",
            category: "",
            posts:[{
                author:"awefv",
                body:"aewjofjvz;ojoi"
            }]
        },],
        server_url: "https://code-school-forum-app-kayle.herokuapp.com",

        threads: []

    },

    created:function(){
        this.getThreads(this.setThreads);
    },

    methods:{
        setThreads: function(data){
            app.threads=data;
        },

        getThreads: function(callback, link = "/thread"){
            fetch(this.server_url+link).then(function(response){
                response.json().then(function(data){
                    callback(data)

                })
            })
        },
        createThread: function(){
            let newThread = {}

            if(this.new_name != "" && this.new_author != ""){

                myData = {
                    name: this.new_name,
                    author: this.new_author,
                    description: this.new_description,
                    category: this.new_category,
                    posts: []
                }
                newThread.name = this.new_name
                newThread.author = this.new_author
                newThread.description = this.new_description
                newThread.category = this.new_category

                fetch(this.server_url+"/thread", {
                    method: "POST",
                    body: JSON.stringify(myData),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(function(response){

                })
                
                this.threads.push(newThread)

                this.new_name = ""
                this.new_category = "all"
                this.new_author = ""
                this.new_description = ""

                this.page = "forum"

            }
            
        },
        deleteThread: function(thread){
            
            this.threads = this.threads.filter(function(ele){ 
                return ele != thread; 
            });
            fetch(this.server_url+"/thread/"+thread._id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){

            })
        },
        changePage: function(newString){
            this.page = newString;
        },
        viewPost: function(thread){
            this.selectedPost = thread
            this.getAllPosts(this.selectedPost._id);
            this.page = "post";
        },
        deletePost: function(post){
            
            //this.selectedPost.posts.splice(post, 1);

            fetch(this.server_url+"/thread/"+this.selectedPost._id+"/"+post._id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                fetch(app.server_url+"/thread").then(function(response){

                    response.json().then(function(data){
                        app.threads=data;
                        fetch(app.server_url+"/thread/"+app.selectedPost._id).then(function(response){
                            response.json().then(function(data){
                                app.postings = data.posts
            
                            })
                        })  

                    })
                })
            })

        },
        createPost: function(){
            
            myData = {
                author: this.new_post_author, 
                body: this.new_post_body, 
                thread_id: this.selectedPost._id
            }
            fetch(this.server_url+"/thread/" + this.selectedPost._id, {
                method: "POST",
                body: JSON.stringify(myData),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(function(response){
                fetch(app.server_url+"/thread").then(function(response){

                    response.json().then(function(data){
                        app.threads=data;
                        fetch(app.server_url+"/thread/"+app.selectedPost._id).then(function(response){
                            response.json().then(function(data){
                                app.postings = data.posts
            
                            })
                        })  

                    })
                })
            })
        },
        getAllPosts: function(thread_id){
            fetch(this.server_url+"/thread/"+thread_id).then(function(response){
                response.json().then(function(data){
                    app.postings=data.posts;
                })
            })
        },
        getThePosts: function(){
            fetch(this.server_url+"/thread/"+this.selectedPost._id).then(function(response){
                response.json().then(function(data){
                    return data.posts

                })
            })        
        },
        antiMrClean: function(){
            for(thread in this.threads){
                if(this.threads[thread].author == "Mr. Clean" || this.threads[thread].author == ""){
                    fetch(this.server_url+"/thread/"+this.threads[thread]._id, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }).then(function(response){
                        fetch(app.server_url+"/thread").then(function(response){
        
                            response.json().then(function(data){
                                app.threads=data;
                                fetch(app.server_url+"/thread").then(function(response){
                                    response.json().then(function(data){
                                        app.threads=data;
                                        
                                    })
                                })  
                                
                            })
                        })
                    })
                }
            }

        }



        
    },
    computed:{
        sorted_threads: function(){
            if(this.filter_catigory == "all"){
                return this.threads
            }else{
                ba = this.filter_catigory
                return this.threads.filter(function(thread){
                    return thread.category == ba;
                })
            }

        },  
        getPosts: function(){
            if(this.selectedPost!=null){
                return this.selectedPost
            }else{
                return this.threads
            }
        }
    }

});


/*
postData = function(){
    fetch(server_url)
}
setInterval(function(){
    fetch(app.server_url+"/thread").then(function(response){

        response.json().then(function(data){
            app.threads=data;
            fetch(app.server_url+"/thread").then(function(response){
                response.json().then(function(data){
                    app.threads=data;

                })
            })  

        })
    })
},1000)*/