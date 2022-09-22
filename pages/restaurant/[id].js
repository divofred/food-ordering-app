import { useContext } from 'react';

import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import Cart from '../../components/cart/';
import AppContext from '../../context/AppContext';

import {
	Button,
	Card,
	CardBody,
	CardImg,
	CardText,
	CardTitle,
	Col,
	Row,
} from 'reactstrap';

const GET_RESTAURANT_DISHES = gql`
	query ($id: ID!) {
		restaurant(id: $id) {
			data {
				id
				attributes {
					name
					dishes {
						data {
							id
							attributes {
								name
								description
								price
								image {
									data {
										attributes {
											url
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

function Restaurants(props) {
	const appContext = useContext(AppContext);
	const router = useRouter();
	const { loading, error, data } = useQuery(GET_RESTAURANT_DISHES, {
		variables: { id: router.query.id },
	});
	if (error) return 'Error Loading Dishes';
	if (loading) return <h1>Loading ...</h1>;
	if (data.restaurant.data.attributes.dishes.data.length) {
		const { restaurant } = data;
		return (
			<>
				<h1>{restaurant.data.attributes.name}</h1>
				<Row>
					{restaurant.data.attributes.dishes.data.map(res => {
						let ress = { res };
						return (
							<Col
								xs="6"
								sm="4"
								style={{ padding: 0 }}
								key={Math.random()}
							>
								<Card style={{ margin: '0 10px' }}>
									<CardImg
										top={true}
										style={{ height: 250 }}
										src={`${
											process.env.STRAPI_URL ||
											'http://localhost:1337'
										}${
											res.attributes.image.data.attributes
												.url
										}`}
									/>
									<CardBody>
										<CardTitle tag="h5">
											{res.attributes.name}
										</CardTitle>
										<CardText>
											{res.attributes.description}
										</CardText>
									</CardBody>
									<div className="card-footer">
										<Button
											outline
											color="primary"
											onClick={() => {
												appContext.addItem(ress);
											}}
										>
											+ Add To Cart
										</Button>
										<style jsx>
											{`
												a {
													color: white;
												}
												a:link {
													text-decoration: none;
													color: white;
												}
												.container-fluid {
													margin-bottom: 30px;
												}
												.btn-outline-primary {
													color: #007bff !important;
												}
												a:hover {
													color: white !important;
												}
											`}
										</style>
									</div>
								</Card>
							</Col>
						);
					})}
					<Col xs="3" style={{ padding: 0 }}>
						<div>
							<Cart />
						</div>
					</Col>
				</Row>
			</>
		);
	}
	return <h1>Add Dishes</h1>;
}
export default Restaurants;
