import React from "react";

function MemberCard({name,role,photo,twitter,linkedin,instagram}) {
  return (
    <div class="col-lg-3 col-md-5 mb-20" >
        <div class="team-left">
            <img class="img-fluid" src={photo} alt=""/>
            <div class="member-desc d-flex align-items-center">
                <div class="m-title col-10 p-0">
                    <h4 style={{fontFamily:"MuseoModerno",color:"#000466"}}>{name}</h4>
                    <p style={{color:"#777777",fontFamily:"Lato"}}>{role}</p>
                </div>
                <div class="m-social col-2 p-0">
                    <div class="t-icons">
                        <a href={linkedin} target="blank"><i class="lni lni-linkedin-original"></i></a>
                        {twitter && <a href={twitter} target="blank"><i class="lni lni-twitter-filled"></i></a>}
                        {instagram && <a href={instagram} target="blank"><i class="lni lni-instagram-filled"></i></a> }
                    </div>
                    {/* <div class="b-icons">
                        <a href="/"><i class="lni lni-dribbble"></i></a>
                        <a href="/"><i class="lni lni-behance-original"></i></a>
                    </div> */}
                </div>
            </div>
        </div>
    </div>
  );
}

export default MemberCard;
