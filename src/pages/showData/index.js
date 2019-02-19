import React, { Component } from 'react'

import ShowDataContainer from '../../containers/showData'
import SearchInput from '../../components/SearchInput/index'
import ButtonClear from '../../components/ClearButton/index'

const token = "b3ae75edd3001797d782b3425d35224f"

class ShowData extends Component {

    state = {
        cityId: "",
        city: "",
        estado: "",
        date: "",
        informacoes: [],
        today: "",
        tomorrow: "",
        country: "",
        //colocar wind depois
    }

    onKeyPress = (e) => {
        const keyCode = e.which || e.keyCode
        if (keyCode === 13) {
            Promise
                .resolve(this.state.city)
                .then(this.getCityId)
                .then(this.getStatsFromId)

        }
    }

    getCityId = async (cityStr) => {

        console.log("cityStr ====== ", cityStr)
        await fetch(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${cityStr}&token=${token}`)
            .then(results => {
                return results.json()
            })
            .then(res => {
                var newId = `${res[0].id}`
                this.setState({
                    cityId: newId
                })
            })
    }

    onChange = e => {
        this.setState({
            city: e.target.value
        })
    }

    getStatsFromId = async () => {

        await fetch(`http://apiadvisor.climatempo.com.br/api/v1/forecast/locale/${this.state.cityId}/days/15?token=${token}`)
            .then(results => {

                return results.json()
            })
            .then(res => {
                const { name, state, country } = res
                const { data } = res
                console.log("=======", res)

                this.setState({
                    city: name,
                    estado: state,
                    informacoes: data,
                    country: country,
                    // today: data[0],
                    // tomorrow: data[1],
                }, () => {
                })
            })
    }

    clearState = e => {
        console.log('limpou')
        this.setState({
            ...this.state,
            cityId: "",
            city: "",
            estado: "",
            date: "",
            informacoes: [],
            today: "",
            tomorrow: "",
            country: "",
        })
    }

    componentDidMount() {

    }

    render() {

        return (
            <div>
                <SearchInput
                    placeholder="Digite uma cidade..."
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                    clearState={this.clearState}
                />
                <ButtonClear
                    clearState={this.clearState}
                />
                <ShowDataContainer
                    onKeyPress={this.onKeyPress}
                    onChange={this.onChange}
                    clearState={this.clearState}
                    city={this.state.city}
                    estado={this.state.estado}
                    informacoes={this.state.informacoes}
                    country={this.state.country}
                />

            </div>
        )
    }
}

export default ShowData