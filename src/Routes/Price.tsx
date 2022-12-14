import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Container } from "../components/Container";
import { Title } from "../components/Title";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";

const CalculateForm = styled.form`
  margin: 30px 0px;
  display: flex;
  flex-direction: column;
`;

const CalDivideForm = styled.div`
  background-color: whitesmoke;
  margin-bottom: 30px;
  border-radius: 10px;
  height: 100px;
  input {
    width: 250px;
    margin: 0px 20px;
    padding: 15px 10px;
    border: 1px solid grey;
    border-radius: 10px;
    font-size: 15px;
  }
`;

const CalTitle = styled.h1`
  font-size: 18px;
  margin-bottom: 5px;
  padding: 5px 7px;
  font-weight: bolder;
`;

const CalSmallTitle = styled.h2`
  font-size: 15px;
  padding: 5px 7px;
  margin: 5px 10px;
`;

const CalBtnDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const CalBtn = styled.button`
  text-align: center;
  width: 100px;
  height: 50px;
  border: none;
  cursor: pointer;
  margin-right: 6px;
  font-size: 16px;
  border-radius: 10px;
  color: black;
  :hover {
    background-color: #bec9e7;
    color: black;
    transform: scale(1.04);
  }
`;

const ResultDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px 30px;
  width: 650px;
  height: 300px;
  background-color: whitesmoke;
`;

const ResultPrice = styled.div`
  width: 200px;
  height: 40px;
  font-size: 24px;
  font-weight: bolder;
  div {
    margin-top: 10px;
    width: 200px;
    height: 5px;
    background-color: orange;
  }
`;

const GridDiv = styled.div`
  display: grid;
  width: 600px;
  height: 300px;
  grid-template-columns: 1fr 1fr 1fr;
`;

const NowDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  display: flex;
`;
const PriceHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

interface CalculateBuy {
  oldprice: number;
  oldcount: number;
  newprice: number;
  newcount: number;
}

function Price() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldcount, setOldCount] = useState("");
  const [oldprice, setOldPrice] = useState("");
  const [newcount, setNewCount] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [toatlcount, setTotalCount] = useState("");
  const [toatlresult, setTotalResult] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CalculateBuy>();
  const onSubmitValid = (data: CalculateBuy) => {
    const oldObject = data.oldcount * data.oldprice;
    const newObject = data.newcount * data.newprice;
    const totalCount = String(Number(data.oldcount) + Number(data.newcount));
    const totalResult = String((oldObject + newObject) / Number(totalCount));
    setOldCount(String(data.oldcount));
    setOldPrice(String(data.oldprice));
    setNewCount(String(data.newcount));
    setNewPrice(String(data.newprice));
    setTotalCount(totalCount);
    setTotalResult(totalResult);
    setIsOpen((prev) => !prev);
  };
  const clickReset = () => {
    reset();
    setIsOpen((prev) => !prev);
  };
  return (
    <Container>
      <PriceHeader>
        <HelmetProvider>
          <Helmet>
            <title>Get Average | JiCoin</title>
          </Helmet>
        </HelmetProvider>
        <Link to="/coinlist">
          <Title>??????????????? ????????? ($)</Title>
        </Link>

        <CalculateForm onSubmit={handleSubmit(onSubmitValid)}>
          <CalDivideForm>
            <CalTitle>?????? ??????</CalTitle>
            <input
              {...register("oldprice", {
                required: "?????? ???????????? ??????????????????",
              })}
              type="number"
              placeholder="?????? ???????????? ??????????????????"
            />
            <input
              {...register("oldcount", {
                required: "?????? ?????? ????????? ??????????????????",
              })}
              type="number"
              placeholder="?????? ?????? ????????? ??????????????????"
            />
          </CalDivideForm>
          <CalDivideForm>
            <CalTitle>?????? ??????</CalTitle>
            <input
              {...register("newprice", {
                required: "?????? ???????????? ??????????????????",
              })}
              type="number"
              placeholder="?????? ???????????? ??????????????????"
            />
            <input
              {...register("newcount", {
                required: "?????? ?????? ????????? ??????????????????",
              })}
              type="number"
              placeholder="?????? ?????? ????????? ??????????????????"
            />
          </CalDivideForm>
          <CalBtnDiv>
            {isOpen ? (
              <CalBtn onClick={clickReset}>?????????</CalBtn>
            ) : (
              <CalBtn type="submit">????????????</CalBtn>
            )}
          </CalBtnDiv>
        </CalculateForm>
        {isOpen ? (
          <ResultDiv>
            <ResultPrice>
              {`????????? : $ ${Math.ceil(+toatlresult)} `}
              <div />
            </ResultPrice>
            <div
              style={{
                width: 600,
                height: 5,
                backgroundColor: "#DCDDE1",
                margin: 20,
              }}
            />
            <GridDiv>
              <NowDiv>
                <CalTitle>?????? ??????</CalTitle>
                <CalSmallTitle>{`?????? ?????? : $ ${oldprice} `}</CalSmallTitle>
                <CalSmallTitle>{`?????? ?????? : ${oldcount} ???`}</CalSmallTitle>
                <CalSmallTitle>{`??? ?????? : $ ${
                  +oldcount * +oldprice
                }`}</CalSmallTitle>
              </NowDiv>
              <NowDiv>
                <CalTitle>?????? ??????</CalTitle>
                <CalSmallTitle>{`?????? ?????? : $ ${newprice}`}</CalSmallTitle>
                <CalSmallTitle>{`?????? ?????? : ${newcount} ???`}</CalSmallTitle>
                <CalSmallTitle>{`??? ?????? : $ ${
                  +newcount * +newprice
                } `}</CalSmallTitle>
              </NowDiv>
              <NowDiv>
                <CalTitle>??? ?????? ???</CalTitle>
                <CalSmallTitle>{`?????? ?????? : $ ${Math.ceil(
                  +toatlresult
                )} `}</CalSmallTitle>
                <CalSmallTitle>{`?????? ?????? : ${
                  Number(oldcount) + Number(newcount)
                } ???`}</CalSmallTitle>
                <CalSmallTitle>{`??? ?????? : $ ${
                  +oldcount * +oldprice + +newcount * +newprice
                } `}</CalSmallTitle>
              </NowDiv>
            </GridDiv>
          </ResultDiv>
        ) : null}
      </PriceHeader>
    </Container>
  );
}
export default Price;
