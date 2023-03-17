/**
 * Module de composant pour l'affichage de la carte MapBox.
 * @remarks
 * Ce composant est chargé d'afficher la carte MapBox sur la page web.
 * Il permet également d'ajouter des marqueurs à la carte et de rechercher les coordonnées d'une ville.
 * @packageDocumentation
 */
import { Component, OnInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { getCityData, getDepartment, getLatitudeLongitude } from "../../app.component"
import { CardComponent } from '../card/card.component';

/** 
 * Composant pour l'affichage de la carte MapBox.
 */
@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {
  departement: string = "";
  /**
   * Carte MapBox.
   */
  map?: mapboxgl.Map;

  /**
   * Style de la carte MapBox.
   */
  style = 'mapbox://styles/mapbox/streets-v12';

  /**
   * Latitude de la carte.
   */
  lat = 46.2276;

  /**
   * Longitude de la carte.
   */
  lng = 2.2137;

  /**
   * Marqueur sur la carte.
   */
  marker?: mapboxgl.Marker;

  /**
    * Constructeur du composant MapBox.
    */
  constructor(private cardComponent: CardComponent) { }

  /**
   * Initialise le composant MapBox.
   * @remarks
   * Cette fonction est appelée lors de l'initialisation du composant.
   * Elle charge la carte MapBox et gère l'ajout de nouveaux marqueurs.
   */
  ngOnInit(): void {

    // Affectation du token
    (mapboxgl as typeof mapboxgl).accessToken = 'pk.eyJ1IjoiZWx6aXgiLCJhIjoiY2xleTB1cGdxMDBmbTN4bDUxMmR3ZWU4bCJ9.-UEOn7npmVEpi3mbP5TOUg';

    // Initialisation de la map
    const map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 4,
      center: [this.lng, this.lat]
    });

    /*// Limites de vue sur la France
    const bounds: mapboxgl.LngLatBoundsLike = [
      [-5.4536, 41.1858], // Sud-ouest de la France
      [9.5608, 51.2756] // Nord-est de la France
    ];

    map.setMaxBounds(bounds);
    map.on('drag', () => {
      (map as any).panInsideBounds(bounds, { animate: false });
    });*/



    // Initialisation du marker
    this.marker = new mapboxgl.Marker();

    // Affectation de la fonction add_marker lorsqu'un event click est lancé sur la map
    map.on('click', this.add_marker.bind(this));

    // map sera reconnu en tant que this.map
    this.map = map;
  }

  /**
   * Cette fonction ajoute un marqueur sur la map et effectue un zoom sur le marqueur.
   * Elle utilise la fonction getCityData pour récupérer les informations de la ville correspondante.
   * @param {object} event - L'événement click de la map.
   */
  add_marker(event: { lngLat: mapboxgl.LngLat; }) {

    // Initialise des coordonées à l'endroit où a été lancé le click event
    const coordinates = event.lngLat;

    // Affichage des coordonées dans la console pour vérification
    console.log('Lng:', coordinates.lng, 'Lat:', coordinates.lat);

    // Si la map et le marker sont reconnus (donc bien initialisés)



    // Vérifie si les coordonnées se trouvent en France
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?types=country&access_token=${(mapboxgl as any).accessToken}`)
      .then(response => response.json())
      .then(data => {
        const country = data.features[0].text;
        if (country === 'France') {
          // Si les coordonnées sont en France, récupère les informations concernant les coordonnées clickées
          getCityData(coordinates.lat, coordinates.lng).then(async cityData => {
            console.log(cityData);
            const depCode = cityData.codeDepartement;
            const dep = await getDepartment(depCode);
            const depName = dep.nom;
            this.departement = depName;
          });
          // Si la map et le marker sont reconnus (donc bien initialisés)
          if (this.map && this.marker) {
            // On change les coordonées du marker puis on l'ajoute à la map
            this.marker.setLngLat(coordinates).addTo(this.map);
            // On zoom sur l'endroit marqué
            this.map.flyTo({ center: coordinates, zoom: 8 });
          }
        } else {
          if (this.map) {
            // Si les coordonnées sont en dehors de la France, affiche une popup avec un message
            new mapboxgl.Popup()
              .setLngLat(coordinates)
              .setHTML(`<p>Meurtre et Moselle n'est pas disponible dans ce pays</p>`)
              .addTo(this.map);
          }
        }
      })
      .catch(error => console.log(error));
  }


  /**
   * Cette fonction prend une ville en paramètre, recherche les coordonnées de cette ville et ajoute un marqueur à cet endroit de la map.
   * Elle utilise la fonction getLatitudeLongitude pour récupérer les coordonnées de la ville.
   * @param {string} city - Le nom de la ville à rechercher.
   */
  searchCity(city: string) {
    console.log('entre dans searchCity : ' + city);
    // On recupère les coordonnées de la ville
    getLatitudeLongitude(city)
      .then((coords) => {
        console.log('Coordonnées de la ville', coords);
        // Si la map et les coordonnées existent
        if (this.map && coords) {
          // On cahnge les coordonées du marker puis on l'ajoute à la map
          this.marker?.setLngLat(coords).addTo(this.map);
          // On zoom sur l'endroit marqué
          this.map.flyTo({ center: coords, zoom: 8 });
        }
      })
      // Si une erreur est rencontrée on l'affiche la console
      .catch((err) => {
        console.error(
          'Erreur lors de la récupération des coordonnées de la ville',
          err
        );
      });
  }

  searchDep(dep: string) {
    this.departement = dep;
  }
}