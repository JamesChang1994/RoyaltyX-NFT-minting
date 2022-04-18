import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";


const Home = ({address, web3, contract, contractAddress, TokenArtifact}) => {
    useEffect(() => {
        
    })

    const [mintPrice, setMintPrice] = useState(10000000000000000);
    const [mintCount, setMintCount] = useState(1);
    const [isLoading, setLoading] = useState(false);


    
    const mint = async () => {
        setLoading(true);
        if (!checkNetwork()) {
            setLoading(false);
            return;
        }

        contract.methods
        .mint(address, mintCount)
        .send({
            gasLimit: 285000 * mintCount,
            to: contractAddress.Token, // the address of your contract
            from: address,
            value: mintPrice * mintCount,
            // "value": 100000000 * mintCount,
        })
        .once("error", (err) => {
            setLoading(false);
            console.log(
            err,
            "EEEEEEEEEEEEEEERRRRRRRRRRRRRRRRRROOOOOOOOOOOOOOOOOOORRRRRRRRRRRRRR"
            );
        })
        .then(async (receipt) => {
            setLoading(false);
            // const event = receipt.events;
            toast.success("Mint Success!", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        
            getTotalSupply();
        }); // Minting the token
    }

    
    // This method checks if Metamask selected network is Localhost:8545
    const checkNetwork = () => {
    if (window.ethereum.networkVersion === Allowed_NETWORK_ID) {
        return true;
    }
    toast.error("Please connect Metamask to RinkeBy!", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    return false;
    };


    return (
        <section>
            <div className='landing n-container'>
                <img src='/img/pot_bg.png' alt="" className="pot_bg" />
                <div className='imagine_text'>
                    <h1 className='imagine_text_real'>IMAGINE THAT...</h1>
                    <h1 className='imagine_text_blue'>IMAGINE THAT...</h1>
                </div>
            </div>

            
            <div className='comment n-container'>
                <div>
                    <button className='mint_btn' onClick={mint}>Mint your NFTs</button>
                </div>
                <div className='mt-4 mb-5'>
                    <button className='join_btn'>Join Our Discord</button>
                </div>

                <Row className='mt-5 pt-5'>
                    <Col lg="6" md="6" sm="12" className=''>
                        <img src='/img/Mask_group.png' alt='' width={"100%"}/>
                    </Col>
                    <Col lg="6" md="6" sm="12" className='beyond_text'>
                        <h1>Beyond your wildest dreams..</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br/><br/> Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem.</p>
                    </Col>
                </Row>

                <Row className='mt-5 justify-content-center'>
                    <h1 className='timeline_title'>Timeline</h1>

                    <Row className='mt-4 timeline_content'>
                        <Col lg="8" md="8" sm="12" className='timeline_text'>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. <br/><br/>Lorem Ipsum is simply dummy text of the printing and typesetting industry Lorem.</p>
                        </Col>
                        <Col lg="4" md="4" sm="12">
                            <img src='/img/whitepaper.png' alt='' width={"100%"} className='whitepaper_img'/>
                        </Col>
                    </Row>
                </Row>
            </div>

            <div className='outLink n-container text-center'>
                <button className='outLink_btn'>Sell your RoyaltyX NFT's</button>
            </div>

        </section>
    );
};

export default connect()(Home);
