// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.24;

contract NextPay{

    modifier checkOwner(uint256 id) {
         require(tweetToOwner[id]==msg.sender,"YOU DO NOT HAVE THE AUTHORITY TO TAKE THIS ACTION!");
         _;
    }

    event AddTweet(address recipent,uint256 tweetId);
    event DeleteTweet(address recipent,uint256 tweetId);


    struct  Tweet{
        uint256 id;
        address username;
        bool isDelete;
        string tweetText;
    }

    Tweet[] private tweets;

    mapping (uint256 => address) tweetToOwner;

    //Ham cho frontend tao bai viet moi 
    function addNewTweet(string memory textTweet,bool  isDeleted) external {
        uint256 tweetId=tweets.length;
        tweets.push(Tweet(tweetId,msg.sender,isDeleted,textTweet));
        tweetToOwner[tweetId]=msg.sender;
        emit AddTweet(msg.sender,tweetId);
    }

    //Ham lay tất cả bài viết
    function getAllTweet()  external view returns(Tweet[] memory) {
        Tweet[] memory getTweet= new Tweet[](tweets.length);

        uint count=0;
        for(uint i=0;i<tweets.length;i++){
            if(tweets[i].isDelete==false){
                getTweet[count]=tweets[i];
                count++;
            }
        }

        Tweet[] memory result= new Tweet[](count);
         for(uint i=0;i<count;i++){
            result[i]=getTweet[i];
        }

        return result;
    }

    //Chi lay bai viet cua minh
    function getMyTweet()  external view returns(Tweet[] memory)  {
        Tweet[] memory getTweet= new Tweet[](tweets.length);

        uint count=0;
        for(uint i=0;i<tweets.length;i++){
            if(tweets[i].isDelete==false && tweets[i].username==msg.sender){
                getTweet[count]=tweets[i];
                count++;
            }
        }

        Tweet[] memory result= new Tweet[](count);
         for(uint i=0;i<count;i++){
            result[i]=getTweet[i];
        }

        return result;
    }

    //xoa tweet 
    function deleteTweet(uint256 id,bool isDeleted) external checkOwner(id) {
       
        for(uint i=0;i<tweets.length;i++){
            if( tweets[i].id==id){
              tweets[i].isDelete=isDeleted;
            }
        }

        emit DeleteTweet(msg.sender,id);
    }
}