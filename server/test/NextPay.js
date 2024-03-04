const {expect}=require('chai');
const {ethers} = require("hardhat");




describe('TEST NEXTPAY',function(){

    let NextPay;
    let nextpay;
    let owner;
   
    const NUM_TOTAL_TWEETS=5;
    const NUM_MY_TWEETS=3;

    let totalTweets;
    let totalMyTweets;


    beforeEach(async function(){

        NextPay=await ethers.getContractFactory('NextPay');
        [owner,user1,user2]=await ethers.getSigners()
        nextpay= await NextPay.deploy();

        totalTweets=[];
        totalMyTweets=[];

        for(let i=1;i<=NUM_TOTAL_TWEETS;i++){
            let  tweet={
                text:"This is the text with "+i,
                isboolean:false,
                username:user1
            }
            await nextpay.connect(user1).addNewTweet(tweet.text,tweet.isboolean)
            totalTweets.push(tweet)
        }

        for(let i=1;i<=NUM_MY_TWEETS;i++){
            let  tweet={
                text:"This is the text with "+(NUM_TOTAL_TWEETS+i),
                isboolean:false,
                username:owner
            }
            await nextpay.addNewTweet(tweet.text,tweet.isboolean)
            totalMyTweets.push(tweet)
            totalTweets.push(tweet)
        }

    })

    describe('Add Tweet',function(){
        it("Emit the event",async ()=>{
            let tweet={
                text:"This is the test emit",
                isDelete:false
            }
            await expect(await nextpay.addNewTweet(tweet.text,tweet.isDelete)).to.emit(nextpay,"AddTweet").withArgs(owner.address,8)
        })
    })

    describe('Get Tweet',function(){
        it('Should return the correct number of total tweets',async()=>{
            const result=await nextpay.getAllTweet();
            await expect(result.length).to.equal(8);
        })

        it('Should return the correct number of my tweets',async()=>{
            const result2=await nextpay.getMyTweet()
            await expect(result2.length).to.equal(3)
        })
    })

    describe('Delete Tweet',function(){
        it('Should emit the DeleteTweet',async()=>{
            await expect(await nextpay.connect(user1).deleteTweet(1,true)).to.emit(nextpay,"DeleteTweet").withArgs(user1.address,1)
        })
    })
})


