import Axios from "axios";
import { format } from "date-fns";
import React, { Fragment, useEffect, useState } from "react";
import { Badge, Card } from "react-bootstrap";
import { AiOutlineArrowUp } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { nullCheck, splitCamelCase } from "../../Utils";
import CustomSpinner from "../Spinner/Spinner";

export default function TransactionsTable() {
  const { token } = useSelector((state) => state.adminSignin);
  const [url, seturl] = useState("api/admin/transaction/list/all");
  const [load, setLoad] = useState(false);
  const [data, setData] = useState([]);
  const [pages, setPages] = useState({
    current: 0,
    last: 0,
  });
  const [next, setNext] = useState([]);

  useEffect(() => {
    setLoad(true);
    Axios.get("https://bellefu.com/" + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        setLoad(false);
        setData(res.data.transactions.data);
        setNext(res.data.transactions.next_page_url);
        setPages({
          current: res.data.transactions.current_page,
          last: res.data.transactions.last_page,
        });
      })
      .catch((err) => {
        setLoad(false);
        setData([]);
        setNext([]);
        setPages({
          current: 0,
          last: 0,
        });
      });
  }, [url]);

  const nextData = () => {
    setLoad(true);
    Axios.get(next, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((res) => {
      setLoad(false);
      setData((prev) => [...prev, res.data.transactions.data]);
      setNext(res.data.transactions.next_page_url);
      setPages({
        current: res.data.transactions.current_page,
        last: res.data.transactions.last_page,
      });
    });
  };

  const getVariant = (item) => {
    switch (item) {
      case "completed":
        return "success";
      case "failed":
        return "danger";
      case "canceled":
        return "secondary";
      case "pending":
        return "info";
      default:
        return "warning";
        break;
    }
  };

  return (
    <div>
      <Card>
        <Card.Header>
          <label htmlFor="url">Filter Transactions</label>
          <select
            name="url"
            id="url"
            className="custom-select"
            style={{ width: "100%" }}
            onChange={(e) => {
              seturl(e.target.value);
            }}
          >
            <option value="api/admin/transaction/list/all">All Transaction List</option>
            <option value="api/admin/transaction/list/completed">Completed Transaction List</option>
            <option value="api/admin/transaction/list/pending">Pending Verified Transaction List</option>
            <option value="api/admin/transaction/list/canceled">Canceled Transaction List</option>
            <option value="api/admin/transaction/list/failed">Failed Transaction List</option>
          </select>
        </Card.Header>
        {load ? (
          <CustomSpinner />
        ) : (
          <Card.Body>
            <InfiniteScroll
              dataLength={data.length}
              next={nextData}
              hasMore={pages.current !== pages.last ? true : false}
              loader={<CustomSpinner />}
              endMessage={
                <a href="#" style={{ textAlign: "center" }}>
                  Back to the top <AiOutlineArrowUp style={{ color: "blue" }} />{" "}
                </a>
              }
            >
              <table class="uk-table uk-table-responsive uk-table-divider">
                <thead style={{ backgroundColor: "#76ba1b", color: "white" }}>
                  <tr>
                    <th style={{ color: "white", fontWeight: "bold" }}>Date</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Type</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Payment Method</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Amount</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>User</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Email</th>
                    <th style={{ color: "white", fontWeight: "bold" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, key) => (
                    <Fragment key={key}>
                      <tr>
                        <td>{format(new Date(item.created_at), "dd-MMM-yyyy hh:mm")}</td>
                        <td style={{ textTransform: "capitalize" }}>{item.type.split("_").join(" ")}</td>
                        <td>{splitCamelCase(item.method_type.split("\\")[1])} </td>
                        <td>
                          {nullCheck(item.payable).currency_symbol}
                          {item.total_amount}
                        </td>
                        <td>{item.user.username}</td>
                        <td>{item.user.email}</td>
                        <td>
                          <Badge variant={getVariant(item.status)} style={{ padding: 10 }}>
                            {item.status}
                          </Badge>
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="7">
                          <b>Product: </b> {nullCheck(item.payable).title}
                        </td>
                      </tr>
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}
