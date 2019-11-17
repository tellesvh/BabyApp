import React, { Component } from 'react';
import {
  Text,
  View,
  Dimensions,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import * as Colors from '../../values/colors';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import axios from 'axios';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import CheckboxAndText from '../../components/CheckboxAndText';
import AsyncStorage from '@react-native-community/async-storage';
import { getBirthdate, monthDiff } from '../../util/birthdateManager';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      generalInfo: [],
      // generalInfo: [
      //   {
      //     tabBarTitle: '1º MÊS',
      //     firstInfo:
      //       '[\n"Postura: de barriga para cima, pernas e braços fletidos​ (dobradas)​, cabeça lateralizada ​(de lado).",\n"Observa um rosto, posicione seu rosto a aproximadamente 30cm acima do rosto da criança e observe se ela olha para você, de forma evidente.",\n"Reage ao som (Batendo palmas, balançar chocalho a cerca de 30cm de cada orelha da criança e observe se ela reage com movimentos nos olhos ou mudança da expressão facial).",\n"Eleva a cabeça, posicione a criança de barriga para baixo e observe se ela levanta a cabeça, levantando (afastando) o queixo da superfície, sem se virar para um dos lados).",\n"Sorriso social quando estimulada, sorria e converse com a criança; não lhe faça cócegas ou toque sua face. Observe se ela responde com um sorriso.",\n"Abre as mãos. Observe se em alguns momentos a criança abre as mãos espontaneamente.",\n"Emite sons. Observe se a criança emite algum som que não seja choro. Caso não seja observado, pergunte ao acompanhante se ela faz em casa.",\n"Movimenta ativamente os membros. Observe se a criança movimenta ativamente tanto os dois braços quanto as duas pernas."\n]',
      //     secondInfo:
      //       '[\n"Para que o bebê se desenvolva bem, é necessário, antes de tudo, que seja amado e desejado pela sua família e que esta tente compreender seus sentimentos e satisfazer suas necessidades. A ligação entre a mãe e o bebê é muito importante neste início de vida; por isso, deve ser fortalecida.",\n"Converse com o bebê, buscando contato visual (olhos nos olhos). Não tenha vergonha de falar com ele de forma carinhosa, aparentemente infantil. É desse modo que se iniciam as primeiras conversas. Lembre-se de que o bebê reconhece e se acalma com a voz da mãe. Nessa fase, o bebê se assusta quando ouve sons ou ruídos inesperados e altos.",\n"Preste atenção no choro do bebê. Ele chora de jeito diferente dependendo do que está sentindo: fome, frio/calor, dor, necessidade de aconchego.",\n"Estimule o bebê mostrando-lhe objetos coloridos a uma distância de mais ou menos 30cm.",\n"Para fortalecer os músculos do pescoço do bebê, deite-o com a barriga para baixo e chame sua atenção com brinquedos ou chamando por ele, estimulando-o a levantar a cabeça. Isto o ajudará a sus."\n]',
      //   },
      //   {
      //     tabBarTitle: '2º MÊS',
      //     firstInfo:
      //       '[\n"Sorriso social quando estimulada, sorria e converse com a criança; não lhe faça cócegas ou toque sua face. Observe se ela responde com um sorriso.",\n"Abre as mãos. Observe se em alguns momentos a criança abre as mãos espontaneamente.",\n"Emite sons. Observe se a criança emite algum som que não seja choro. Caso não seja observado, pergunte ao acompanhante se ela faz em casa.",\n"Movimenta ativamente os membros. Observe se a criança movimenta ativamente tanto os dois braços quanto as duas pernas.",\n"Resposta ativa ao contato social. Fique à frente do bebê e converse com ele. Observe se ele responde com sorriso e emissão de sons como se estivesse “conversando” com você.",\n"Segura objetos. Ofereça um objeto tocando nas costas da mão (lado oposto da palma da mão) ou dedos da criança. Esta deverá abrir as mãos e segurar o objeto pelo menos por alguns segundos.",\n"Emite sons. Fique à frente da criança e converse com ela. Observe se ela emite sons (gugu, eeee etc.)."\n]',
      //     secondInfo:
      //       '[\n"Brinque com o bebê conversando e olhando para ele.",\n"Ofereça objetos para ele pegar, tocar com as mãos.",\n"Coloque o bebê de barriga para baixo, apoiado nos seus braços, e brinque com ele, conversando ou mostrando-lhe brinquedos à sua frente.",\n"Observe que o bebê brinca com a voz e tenta “conversar”, falando “aaa, qqq, rrr”"\n]',
      //   },
      //   {
      //     tabBarTitle: '3º MÊS',
      //     firstInfo:
      //       '[\n   "Resposta ativa ao contato social. Fique à frente do bebê e converse com ele. Observe se ele responde com sorriso e emissão de sons como se estivesse “conversando” com você.",\n   "Segura objetos. Ofereça um objeto tocando nas costas da mão (lado oposto da palma da mão) ou dedos da criança. Esta deverá abrir as mãos e segurar o objeto pelo menos por alguns segundos.",\n   "Emite sons. Fique à frente da criança e converse com ela. Observe se ela emite sons (gugu, eeee etc.).",\n   "De barriga para baixo (bruço), levanta a cabeça, apoiando-se nos antebraços. Coloque a criança de barriga para baixo, numa superfície firme. Chame sua atenção à frente com objetos ou seu rosto e observe se ela levanta a cabeça apoiando-se nos antebraços/cotovelo."\n]',
      //     secondInfo:
      //       '[\n   "Brinque com o bebê conversando e olhando para ele.",\n   "Ofereça objetos para ele pegar, tocar com as mãos.",\n   "Coloque o bebê de bruços, apoiado nos seus braços, e brinque com ele, conversando ou mostrando-lhe brinquedos à sua frente.",\n   "Observe que o bebê brinca com a voz e tenta “conversar”, falando “aaa, qqq, rrr”"\n]',
      //   },
      //   {
      //     tabBarTitle: '4º MÊS',
      //     firstInfo:
      //       '[\n   "Resposta ativa ao contato social. Fique à frente do bebê e converse com ele. Observe se ele responde com sorriso e emissão de sons como se estivesse “conversando” com você.",\n   "Segura objetos. Ofereça um objeto tocando nas costas da mão (lado oposto da palma da mão) ou dedos da criança. Esta deverá abrir as mãos e segurar o objeto pelo menos por alguns segundos.",\n   "Emite sons. Fique à frente da criança e converse com ela. Observe se ela emite sons (gugu, eeee etc.).",\n   "De barriga para baixo (bruço), levanta a cabeça, apoiando-se nos antebraços. Coloque a criança de barriga para baixo, numa superfície firme. Chame sua atenção à frente com objetos ou seu rosto e observe se ela levanta a cabeça apoiando-se nos antebraços/cotovelo.",\n   "Busca ativa de objetos. Coloque um objeto ao alcance da criança (sobre a mesa ou na palma de sua mão) chamando sua atenção para o mesmo. Observe se ela tenta alcançá-lo.",\n   "Leva objetos à boca. Coloque um objeto na mão da criança e observe se ela o leva à boca.",\n   "Localiza o som. Faça um barulho suave (sino, chocalho etc.) próximo à orelha da criança e observe se ela vira a cabeça em direção ao objeto que produziu o som. Repita no lado oposto.",\n   "Muda de posição ativamente (rola). Coloque a criança em superfície plana de barriga para cima. Incentive-a a virar para a posição de bruço (barriga para baixo)."\n]',
      //     secondInfo:
      //       '[\n   "Ao oferecer algo para o bebê (comida, brinquedo etc.), espere um pouco para ver sua reação. Com isso, ele aprenderá a expressar aceitação, prazer e desconforto.",\n   "Acostume o bebê a dormir mais à noite.",\n   "Ofereça brinquedos a pequenas distâncias, dando a ele a chance de alcançá-los.",\n   "Proporcione estímulos sonoros ao bebê, fora do seu alcance visual, para que ele tente localizar de onde vem o som, virando a cabeça.",\n   "Estimule-o a rolar, mudando de posição (de barriga para baixo para barriga para cima). Use objetos e outros recursos (brinquedos, palmas, etc)"\n]',
      //   },
      //   {
      //     tabBarTitle: '5º MÊS',
      //     firstInfo:
      //       '[\n   "Busca ativa de objetos. Coloque um objeto ao alcance da criança (sobre a mesa ou na palma de sua mão) chamando sua atenção para o mesmo. Observe se ela tenta alcançá-lo.",\n   "Leva objetos à boca. Coloque um objeto na mão da criança e observe se ela o leva à boca.",\n   "Localiza o som. Faça um barulho suave (sino, chocalho etc.) próximo à orelha da criança e observe se ela vira a cabeça em direção ao objeto que produziu o som. Repita no lado oposto.",\n   "Muda de posição ativamente (rola). Coloque a criança em superfície plana de barriga para cima. Incentive-a a virar para a posição de bruço (barriga para baixo)."\n]',
      //     secondInfo:
      //       '[\n   "Ao oferecer algo para o bebê (comida, brinquedo etc.), espere um pouco para ver sua reação. Com isso, ele aprenderá a expressar aceitação, prazer e desconforto.",\n   "Acostume o bebê a dormir mais à noite.",\n   "Ofereça brinquedos a pequenas distâncias, dando a ele a chance de alcançá-los.",\n   "Proporcione estímulos sonoros ao bebê, fora do seu alcance visual, para que ele tente localizar de onde vem o som, virando a cabeça.",\n   "Estimule-o a rolar, mudando de posição (de barriga para baixo para barriga para cima). Use objetos e outros recursos (brinquedos, palmas, etc)"\n]',
      //   },
      //   {
      //     tabBarTitle: '6º MÊS',
      //     firstInfo:
      //       '[\n   "Busca ativa de objetos. Coloque um objeto ao alcance da criança (sobre a mesa ou na palma de sua mão) chamando sua atenção para o mesmo. Observe se ela tenta alcançá-lo.",\n   "Leva objetos à boca. Coloque um objeto na mão da criança e observe se ela o leva à boca.",\n   "Localiza o som. Faça um barulho suave (sino, chocalho etc.) próximo à orelha da criança e observe se ela vira a cabeça em direção ao objeto que produziu o som. Repita no lado oposto.",\n   "Muda de posição ativamente (rola). Coloque a criança em superfície plana de barriga para cima. Incentive-a a virar para a posição de bruço (barriga para baixo).",\n   "Brinca de esconde-achou. Coloque-se à frente da criança e brinque de aparecer e desaparecer, atrás de um pano ou de outra pessoa. Observe se a criança faz movimentos para procurá-lo quando desaparece, como tentar puxar o pano ou olhar atrás da outra pessoa.",\n   "Transfere objetos de uma mão para a outra. Ofereça um objeto para a criança segurar. Observe se ela o transfere de uma mão para outra. Se não fizer, ofereça outro objeto e observe se ela transfere o primeiro para a outra mão.",\n   "Duplica sílabas. Observe se a criança fala “papa”, “dada”, “mama”. Se não o fizer, pergunte à mãe/cuidador se ela o faz em casa.",\n   "Senta-se sem apoio. Coloque a criança numa superfície firme, ofereça-lhe um objeto para ela segurar e observe se ela fica sentada sem o apoio das mãos para equilibrar-se."\n]',
      //     secondInfo:
      //       '[\n   "Dê atenção à criança demonstrando que está atento aos seus pedidos.",\n   "Nesta idade, ela busca chamar a atenção das pessoas, procurando agradá-las e obter a sua aprovação.",\n   "Dê à criança brinquedos fáceis de segurar, para que ela treine passar de uma mão para a outra.",\n   "Converse bastante com a criança, cante, use palavras que ela possa repetir (dadá, papá etc.) Ela também pode localizar de onde vem o som",\n   "Coloque a criança no chão (esteira, colchonete) estimulando-a a se sentar, se arrastar e engatinhar."\n]',
      //   },
      //   {
      //     tabBarTitle: '7º MÊS',
      //     firstInfo:
      //       '[\n   "Brinca de esconde-achou: Coloque-se à frente da criança e brinque de aparecer e desaparecer, atrás de um pano ou de outra pessoa. Observe se a criança faz movimentos para procurá-lo quando desaparece, como tentar puxar o pano ou olhar atrás da outra pessoa.",\n   "Transfere objetos de uma mão para a outra: Ofereça um objeto para a criança segurar.",\n   "Observe se ela o transfere de uma mão para outra. Se não ﬁzer, ofereça outro objeto e observe se ela transfere o primeiro para a outra mão.",\n   "Duplica sílabas: Observe se a criança fala “papa”, “dada”, “mama”. Se não o ﬁzer, pergunte à mãe/cuidador se ela o faz em casa.",\n   "Senta-se sem apoio: coloque a criança numa superfície ﬁrme, ofereça-lhe um objeto para ela segurar e observe se ela ﬁca sentada sem o apoio das mãos para equilibrar-se."\n]',
      //     secondInfo:
      //       '[\n   "Dê atenção à criança demonstrando que está atento aos seus pedidos.",\n   "Nesta idade, ela busca chamar a atenção das pessoas, procurando agradá-las e obter a sua aprovação.",\n   "Dê à criança brinquedos fáceis de segurar, para que ela treine passar de uma mão para a outra.",\n   "Converse bastante com a criança, cante, use palavras que ela possa repetir (dadá, papá etc). Ela também pode localizar de onde vem o som.",\n   "Coloque a criança no chão (esteira, colchonete) estimulando-a a se sentar, se arrastar e engatinhar."\n]',
      //   },
      //   {
      //     tabBarTitle: '8º MÊS',
      //     firstInfo:
      //       '[\n   "Brinca de esconde-achou: Coloque-se à frente da criança e brinque de aparecer e desaparecer, atrás de um pano ou de outra pessoa. Observe se a criança faz movimentos para procurá-lo quando desaparece, como tentar puxar o pano ou olhar atrás da outra pessoa.",\n   "Transfere objetos de uma mão para a outra: Ofereça um objeto para a criança segurar. Observe se ela o transfere de uma mão para outra. Se não ﬁzer, ofereça outro objeto e observe se ela transfere o primeiro para a outra mão.",\n   "Duplica sílabas: Observe se a criança fala “papa”, “dada”, “mama”. Se não o ﬁzer, pergunte à mãe/cuidador se ela o faz em casa.",\n   "Senta-se sem apoio: coloque a criança numa superfície ﬁrme, ofereça-lhe um objeto para ela segurar e observe se ela ﬁca sentada sem o apoio das mãos para equilibrar-se."\n]',
      //     secondInfo:
      //       '[\n   "Dê atenção à criança demonstrando que está atento aos seus pedidos.",\n   "Nesta idade, ela busca chamar a atenção das pessoas, procurando agradá-las e obter a sua aprovação.",\n   "Dê à criança brinquedos fáceis de segurar, para que ela treine passar de uma mão para a outra.",\n   "Converse bastante com a criança, cante, use palavras que ela possa repetir (dadá, papá etc). Ela também pode localizar de onde vem o som",\n   "Coloque a criança no chão (esteira, colchonete) estimulando-a a se sentar, se arrastar e engatinhar."\n]',
      //   },
      //   {
      //     tabBarTitle: '9º MÊS',
      //     firstInfo:
      //       '[\n   "Brinca de esconde-achou: Coloque-se à frente da criança e brinque de aparecer e desaparecer, atrás de um pano ou de outra pessoa. Observe se a criança faz movimentos para procurá-lo quando desaparece, como tentar puxar o pano ou olhar atrás da outra pessoa.",\n   "Transfere objetos de uma mão para a outra: Ofereça um objeto para a criança segurar. Observe se ela o transfere de uma mão para outra. Se não ﬁzer, ofereça outro objeto e observe se ela transfere o primeiro para a outra mão.",\n   "Duplica sílabas: Observe se a criança fala “papa”, “dada”, “mama”. Se não o fizer, pergunte à mãe/cuidador se ela o faz em casa.",\n   "Senta-se sem apoio: coloque a criança numa superfície ﬁrme, ofereça-lhe um objeto para ela segurar e observe se ela ﬁca sentada sem o apoio das mãos para equilibrar-se.",\n   "Imita gestos: Faça algum gesto conhecido pela criança como bater palmas ou dar tchau e observe se ela o imita. Caso ela não o faça, peça à mãe/cuidador para estimulá-la.",\n   "Faz pinça: Coloque próximo à criança uma bolinha de papel. Chame a atenção da criança para que ela a pegue. Observe se, ao pegá-la, ela usa o movimento de pinça, com qualquer parte do polegar associado ao indicador.",\n   "Produz “jargão”: Observe se a criança produz uma conversação incompreensível consigo mesma, com você ou com a mãe/cuidador (jargão). Caso não seja possível observar, pergunte se ela o faz em casa.",\n   "Anda com apoio: Observe se a criança consegue dar alguns passos com apoio."\n]',
      //     secondInfo:
      //       '[\n   "Dê atenção à criança demonstrando que está atento aos seus pedidos.",\n   "Nesta idade, ela busca chamar a atenção das pessoas, procurando agradá-las e obter a sua aprovação.",\n   "Dê à criança brinquedos fáceis de segurar, para que ela treine passar de uma mão para a outra.",\n   "Converse bastante com a criança, cante, use palavras que ela possa repetir (dadá, papá etc). Ela também pode localizar de onde vem o som",\n   "Coloque a criança no chão (esteira, colchonete) estimulando-a a se sentar, se arrastar e engatinhar."\n]',
      //   },
      //   {
      //     tabBarTitle: '10º MÊS',
      //     firstInfo:
      //       '[\n   "Imita gestos: Faça algum gesto conhecido pela criança como bater palmas ou dar tchau e observe se ela o imita. Caso ela não o faça, peça à mãe/cuidador para estimulá-la.",\n   "Faz pinça: Coloque próximo à criança uma bolinha de papel. Chame a atenção da criança para que ela a pegue. Observe se, ao pegá-la, ela usa o movimento de pinça, com qualquer parte do polegar associado ao indicador.",\n   "Produz “jargão”: Observe se a criança produz uma conversação incompreensível consigo mesma, com você ou com a mãe/cuidador (jargão). Caso não seja possível observar, pergunte se ela o faz em casa.",\n   "Anda com apoio: Observe se a criança consegue dar alguns passos com apoio."\n]',
      //     secondInfo:
      //       '[\n   "Brinque com a criança com músicas, fazendo gestos (bater palmas, dar tchau etc.), solicitando sua resposta.",\n   "Coloque ao alcançe da criança, sempre na presença de um adulto, objetos pequenos como tampinhas ou bolinha de papel pequena, para que ela possa apanhá -los, usando o movimento de pinça (dois dedinhos) Muito cuidado para que ela não coloque esses objetos na boca, no nariz ou nos ouvidos.",\n   "Converse com a criança e use livros com ﬁguras. Ela pode falar algumas palavras como (mamã, papá, dá) e entende ordens simples como “dar tchau”.",\n   "Deixe a criança no chão para que ela possa levantar-se e andar se apoiando."\n]',
      //   },
      //   {
      //     tabBarTitle: '11º MÊS',
      //     firstInfo:
      //       '[\n   "Imita gestos: Faça algum gesto conhecido pela criança como bater palmas ou dar tchau e observe se ela o imita. Caso ela não o faça, peça à mãe/cuidador para estimulá-la.",\n   "Faz pinça: Coloque próximo à criança uma bolinha de papel. Chame a atenção da criança para que ela a pegue. Observe se, ao pegá-la, ela usa o movimento de pinça, com qualquer parte do polegar associado ao indicador.",\n   "Produz “jargão”: Observe se a criança produz uma conversação incompreensível consigo mesma, com você ou com a mãe/cuidador (jargão). Caso não seja possível observar, pergunte se ela o faz em casa.",\n   "Anda com apoio: Observe se a criança consegue dar alguns passos com apoio."\n]',
      //     secondInfo:
      //       '[\n   "Brinque com a criança com músicas, fazendo gestos (bater palmas, dar tchau etc.), solicitando sua resposta.",\n   "Coloque ao alcançe da criança, sempre na presença de um adulto, objetos pequenos como tampinhas ou bolinha de papel pequena, para que ela possa apanhá -los, usando o movimento de pinça (dois dedinhos) Muito cuidado para que ela não coloque esses objetos na boca, no nariz ou nos ouvidos.",\n   "Converse com a criança e use livros com ﬁguras. Ela pode falar algumas palavras como (mamã, papá, dá) e entende ordens simples como “dar tchau”.",\n   "Deixe a criança no chão para que ela possa levantar-se e andar se apoiando."\n]',
      //   },
      //   {
      //     tabBarTitle: '12º MÊS',
      //     firstInfo:
      //       '[\n   "Imita gestos: Faça algum gesto conhecido pela criança como bater palmas ou dar tchau e observe se ela o imita. Caso ela não o faça, peça à mãe/cuidador para estimulá-la.",\n   "Faz pinça: Coloque próximo à criança uma bolinha de papel. Chame a atenção da criança para que ela a pegue. Observe se, ao pegá-la, ela usa o movimento de pinça, com qualquer parte do polegar associado ao indicador.",\n   "Produz “jargão”: Observe se a criança produz uma conversação incompreensível consigo mesma, com você ou com a mãe/cuidador (jargão). Caso não seja possível observar, pergunte se ela o faz em casa.",\n   "Anda com apoio: Observe se a criança consegue dar alguns passos com apoio."\n]',
      //     secondInfo:
      //       '[\n   "Brinque com a criança com músicas, fazendo gestos (bater palmas, dar tchau etc.), solicitando sua resposta",\n   "Coloque ao alcançe da criança, sempre na presença de um adulto, objetos pequenos como tampinhas ou bolinha de papel pequena, para que ela possa apanhá -los, usando o movimento de pinça (dois dedinhos) Muito cuidado para que ela não coloque esses objetos na boca, no nariz ou nos ouvidos.",\n   "Converse com a criança e use livros com ﬁguras. Ela pode falar algumas palavras como (mamã, papá, dá) e entende ordens simples como “dar tchau”.",\n   "Deixe a criança no chão para que ela possa levantar-se e andar se apoiando."\n]',
      //   },
      // ],
      selectedInfos: [],
    };
  }

  async componentDidMount() {
    this.props.navigation.addListener('didFocus', payload =>
      this.componentDidFocus(payload),
    );

    axios
      .get(
        'https://spreadsheets.google.com/feeds/cells/1_rLMSlra9hE3kfHmRKaQTppuBYrMeT1RyDp8fOPZrC8/1/public/full?alt=json',
      )
      .then(async res => {
        this.setState(
          {
            generalInfo: this.organizeRawGoogleAPIData(res.data.feed.entry),
          },
          async () => {
            const selectedInfosFromAsyncStorage = await AsyncStorage.getItem(
              '@selectedInfos',
            );
            if (selectedInfosFromAsyncStorage !== null) {
              this.setState({
                selectedInfos: JSON.parse(selectedInfosFromAsyncStorage),
              });
            }
            this.setInitialPageForBirthdate(await getBirthdate());
          },
        );
      });
  }

  organizeRawGoogleAPIData(rawData) {
    let headerTitles = [];
    let finalArray = [];

    rawData.map(element => {
      if (element.gs$cell.row === '1') {
        headerTitles.push(element.content.$t);
      } else {
        return;
      }
    });

    for (
      let index = headerTitles.length;
      index < rawData.length;
      index += headerTitles.length
    ) {
      const rawPortion = rawData.slice(index, index + headerTitles.length);
      let organizedPortion = {};

      headerTitles.map((title, index) => {
        organizedPortion = {
          ...organizedPortion,
          [title]: rawPortion[index].content.$t,
        };
      });

      finalArray.push(organizedPortion);
    }

    return finalArray;
  }

  async componentDidFocus(payload) {
    if (this.state.generalInfo.length > 0) {
      this.setInitialPageForBirthdate(await getBirthdate());
    }
  }

  setInitialPageForBirthdate(birthdate) {
    const monthDiffValue = monthDiff(new Date(birthdate), new Date()) + 1;
    if (monthDiffValue < 12) {
      this.scrollableTabView.goToPage(monthDiffValue - 1);
    } else {
      this.scrollableTabView.goToPage(11);
    }
  }

  handleSelection(index, uniqueInfo, firstOrsecondInfo) {
    let selectedInfos = [...this.state.selectedInfos];
    let selectedInfosIndex = selectedInfos.findIndex(
      item => item.section === uniqueInfo.tabBarTitle,
    );
    if (selectedInfosIndex !== -1) {
      let infoIndex;
      switch (firstOrsecondInfo) {
        case 0:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].firstInfoSelected.findIndex(item => item === index);

          if (infoIndex === -1) {
            selectedInfos[selectedInfosIndex].firstInfoSelected.push(index);
          } else {
            selectedInfos[selectedInfosIndex].firstInfoSelected = selectedInfos[
              selectedInfosIndex
            ].firstInfoSelected.filter(function (item) {
              return item !== index;
            });
          }
          break;
        case 1:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].secondInfoSelected.findIndex(item => item === index);

          if (infoIndex === -1) {
            selectedInfos[selectedInfosIndex].secondInfoSelected.push(index);
          } else {
            selectedInfos[
              selectedInfosIndex
            ].secondInfoSelected = selectedInfos[
              selectedInfosIndex
            ].secondInfoSelected.filter(function (item) {
              return item !== index;
            });
          }
          break;
      }
    } else {
      switch (firstOrsecondInfo) {
        case 0:
          selectedInfos.push({
            section: uniqueInfo.tabBarTitle,
            firstInfoSelected: [index],
            secondInfoSelected: [],
          });
          break;
        case 1:
          selectedInfos.push({
            section: uniqueInfo.tabBarTitle,
            firstInfoSelected: [],
            secondInfoSelected: [index],
          });
          break;
      }
    }

    this.setState({
      selectedInfos,
    });

    AsyncStorage.setItem('@selectedInfos', JSON.stringify(selectedInfos));
  }

  isSelected(index, uniqueInfo, firstOrsecondInfo) {
    let selectedInfos = [...this.state.selectedInfos];
    let selectedInfosIndex = selectedInfos.findIndex(
      item => item.section === uniqueInfo.tabBarTitle,
    );
    if (selectedInfosIndex !== -1) {
      let infoIndex;

      switch (firstOrsecondInfo) {
        case 0:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].firstInfoSelected.findIndex(item => item === index);
          break;
        case 1:
          infoIndex = selectedInfos[
            selectedInfosIndex
          ].secondInfoSelected.findIndex(item => item === index);
          break;
      }

      if (infoIndex === -1) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  findSelectedItemsForSection(uniqueInfo) {
    let selectedInfos = this.state.selectedInfos.filter(
      item => item.section === uniqueInfo.tabBarTitle,
    );

    if (selectedInfos[0]) {
      return (
        selectedInfos[0].firstInfoSelected.length +
        selectedInfos[0].secondInfoSelected.length
      );
    } else {
      return 0;
    }
  }

  findTotalForSection(uniqueInfo) {
    let firstInfoArray = JSON.parse(uniqueInfo.firstInfo);
    let secondInfoArray = JSON.parse(uniqueInfo.secondInfo);

    return firstInfoArray.length + secondInfoArray.length;
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {this.state.generalInfo.length > 0 ? (
          <ScrollableTabView
            ref={scrollableTabView =>
              (this.scrollableTabView = scrollableTabView)
            }
            initialPage={0}
            prerenderingSiblingsNumber={6}
            renderTabBar={() => (
              <ScrollableTabBar
                activeTextColor={'#FFF'}
                inactiveTextColor="rgba(255,255,255,0.5)"
                underlineStyle={{ backgroundColor: '#FFF' }}
                style={{
                  backgroundColor: Colors.primaryDarkColor,
                  borderBottomWidth: 0,
                }}
              />
            )}>
            {this.state.generalInfo.map((uniqueInfo, uniqueInfoIndex) => {
              let firstInfoArray = JSON.parse(uniqueInfo.firstInfo);
              let secondInfoArray = JSON.parse(uniqueInfo.secondInfo);
              return (
                <ScrollView
                  tabLabel={uniqueInfo.tabBarTitle}
                  scrollIndicatorInsets={{
                    bottom: getBottomSpace() > 0 && 0.1,
                  }}
                  contentContainerStyle={{
                    paddingHorizontal: 16,
                    // paddingTop: 16,
                    paddingBottom: getBottomSpace() > 0 ? getBottomSpace() : 16,
                  }}
                  stickyHeaderIndices={[0]}
                  style={{ flex: 1 }}>
                  <View
                    style={{
                      paddingTop: 16,
                      paddingBottom: 16,
                      backgroundColor: '#FFF',
                    }}>
                    {/* <Text>
                    {this.findSelectedItemsForSection(uniqueInfo)} de{' '}
                    {this.findTotalForSection(uniqueInfo)}
                  </Text> */}
                    <View style={{ marginBottom: 8 }}>
                      <Text style={{ fontWeight: 'bold', fontSize: 42 }}>
                        {this.findSelectedItemsForSection(uniqueInfo)}
                        <Text style={{ fontSize: 18, fontWeight: 'normal' }}>
                          {' '}
                          de {this.findTotalForSection(uniqueInfo)}
                        </Text>
                      </Text>
                    </View>
                    <ProgressBarAnimated
                      width={Dimensions.get('screen').width - 32}
                      value={
                        (this.findSelectedItemsForSection(uniqueInfo) /
                          this.findTotalForSection(uniqueInfo)) *
                        100
                      }
                      borderRadius={300}
                      barAnimationDuration={300}
                      backgroundColorOnComplete={Colors.primaryDarkColor}
                    />
                  </View>
                  <View style={{ marginBottom: 24 }}>
                    <FlatList
                      data={firstInfoArray}
                      extraData={this.state}
                      renderItem={({ item, index }) => (
                        <CheckboxAndText
                          text={item}
                          onPress={() => {
                            this.handleSelection(index, uniqueInfo, 0);
                          }}
                          isSelected={this.isSelected(index, uniqueInfo, 0)}
                        />
                      )}
                      keyExtractor={(item, index) => `${index}`}
                      ItemSeparatorComponent={() => (
                        <View style={{ height: 12 }} />
                      )}
                    />
                  </View>
                  <View style={{ marginBottom: 16 }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        marginBottom: 8,
                      }}>
                      Estímulos
                    </Text>
                    <FlatList
                      data={secondInfoArray}
                      renderItem={({ item, index }) => (
                        <CheckboxAndText
                          text={item}
                          onPress={() => {
                            this.handleSelection(index, uniqueInfo, 1);
                          }}
                          isSelected={this.isSelected(index, uniqueInfo, 1)}
                        />
                      )}
                      keyExtractor={(item, index) => `${index}`}
                      ItemSeparatorComponent={() => (
                        <View style={{ height: 12 }} />
                      )}
                    />
                  </View>
                </ScrollView>
              );
            })}
          </ScrollableTabView>
        ) : (
            <ActivityIndicator size="large" color={Colors.primaryDarkColor} />
          )}
      </View>
    );
  }
}
