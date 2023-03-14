/**
 * Module de composant pour l'affichage de la carte MapBox.
 * @remarks
 * Ce composant est chargé d'afficher la carte MapBox sur la page web.
 * Il permet également d'ajouter des marqueurs à la carte et de rechercher les coordonnées d'une ville.
 * @packageDocumentation
 */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { getCityData, getLatitudeLongitude } from "../../app.component"

/** 
 * Composant pour l'affichage de la carte MapBox.
 */
@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css']
})
export class MapBoxComponent implements OnInit {

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
  lat = 47;

  /**
   * Longitude de la carte.
   */
  lng = 2.5;

  /**
   *Indique si la carte est initialisée ou non.
   */
  isMapInitialized = false;

  /**
   * Marqueur sur la carte.
   */
  marker?: mapboxgl.Marker;

  /**
    * Constructeur du composant MapBox.
    */
  constructor() { }

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
      zoom: 5,
      center: [this.lng, this.lat]
    });

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
    if (this.map && this.marker) {
      // On chnage les coordonées du marker puis on l'ajoute à la map
      this.marker.setLngLat(coordinates).addTo(this.map);
      // On zoom sur l'endroit marqué
      this.map.flyTo({ center: coordinates, zoom: 8 });
    }
  
    // Appelle la fonction getCityData nous donnant les informations concernant les coordonées clickées
    getCityData(coordinates.lat, coordinates.lng).then(cityData => {
      console.log(cityData);
    });
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
      // Si une erreur est rencontrée on l'affiche dans la console
      .catch((err) => {
        console.error(
          'Erreur lors de la récupération des coordonnées de la ville',
          err
        );
      });
  }
}

