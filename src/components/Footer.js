import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/footer.css";

const Footer = () => {
  return (
    <Container className="my-4">
      <Row className="justify-content-center text-center">
        <Col className="col-4">
          <Row>
            <a style={{ textDecoration: "none" }} href="/" className="m-2">
              <i className="bi bi-facebook">Facebook</i>
            </a>
          </Row>
        </Col>
        <Col className="col-4">
          <Row>
            <a
              style={{ textDecoration: "none", color: "red" }}
              href="/"
              className="m-2"
            >
              <i className="bi bi-youtube">Youtube</i>
            </a>
          </Row>
        </Col>
        <Col>
          <Row>
            <a
              style={{ textDecoration: "none", color: "pink" }}
              href="/"
              className="m-2"
            >
              <i className="bi bi-instagram">Instagram</i>
            </a>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center text-center my-3">
        <Col>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="/">Mô tả âm thanh</a>
            </li>
            <li className="footer-item">
              <a href="/">Quan hệ với nhà đầu tư</a>
            </li>
            <li className="footer-item">
              <a href="/">Thông báo pháp lý</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="/">Trung tâm trợ giúp</a>
            </li>
            <li className="footer-item">
              <a href="/">Việc làm</a>
            </li>
            <li className="footer-item">
              <a href="/">Tùy chọn cookie</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="/">Thẻ quà tặng</a>
            </li>
            <li className="footer-item">
              <a href="/">Điều khoản sử dụng</a>
            </li>
            <li className="footer-item">
              <a href="/">Thông tin doanh nghiệp</a>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className="footer-list">
            <li className="footer-item">
              <a href="/">Trung tâm đa phương tiện</a>
            </li>
            <li className="footer-item">
              <a href="/">Quyền riêng tư</a>
            </li>
            <li className="footer-item">
              <a href="/">Liên hệ với chúng tôi</a>
            </li>
          </ul>
        </Col>
      </Row>
      <Row>
        <span className="copyright">© Copyright by HoaND</span>
      </Row>
    </Container>
  );
};

export default Footer;
