import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export default class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

  constructor() {
    super();
    // console.log("this is a constructor don't disturb it")
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a3dc77fe9a34681834d3673e5d7683c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
    console.log(this.state.page)

  }
  handlePreviousclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a3dc77fe9a34681834d3673e5d7683c&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    console.log(this.state.page)
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading: false
    })

  }
  handleNextclick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4a3dc77fe9a34681834d3673e5d7683c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json()
      // console.log(parsedData)
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false

      })
    }
    //   this.setState({ loading: true });
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading: false
    //   })
    // }
  }


  // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))){
  //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=
  //   ${this.props.category}&apiKey=4a3dc77fe9a34681834d3673e5d7683c&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //   console.log(this.state.page)
  //   this.setState({ loading: true })
  //   let data = await fetch(url);
  //   let parsedData = await data.json()
  //   console.log(parsedData)
  //   this.setState({
  //     page: this.state.page + 1,
  //     articles: parsedData.articles,
  //     loading: false

  //   })

  // }


  render() {
    return (
      <div className='container my-3'>
        <h1 className='text-center '>News - Today's Top HeadLines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} ImageUrl={element.urlToImage ? element.urlToImage : "https://techcrunch.com/wp-content/uploads/2022/09/07edb091bb329145ee3f3f01476adb40acc6457b.jpg?resize=1200,675"} url={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreviousclick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextclick}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}































