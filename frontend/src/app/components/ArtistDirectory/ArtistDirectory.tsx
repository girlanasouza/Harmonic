import React from "react";
import { Carousel } from "react-bootstrap";
import CardArtist from "../CardArtist/CardArtist";
import { Artist } from "@/app/types/artist.type";

interface IListagemArtistas {
  artistas: Artist[];
}

const ArtistDirectory = ({ artistas }: IListagemArtistas) => {
  const groupedArtists = [];
  for (let i = 0; i < artistas.length; i += 4) {
    groupedArtists.push(artistas.slice(i, i + 4));
  }

  return (
    <>
      <div>
        <h4 className="fw-normal text-info-emphasis">Artistas Recomendados</h4>
        <p className="fw-light">
          Recomendações baseadas em seu gosto musical :)
        </p>
        <div className="">
          <Carousel
            indicators={false}
            prevIcon={<i className="bi bi-caret-left-fill fs-1"></i>}
            prevLabel={<>dasdasdasd</>}
            nextIcon={<i className="bi bi-caret-right-fill fs-1"></i>}
            nextLabel={<>dsadsa</>}
          >
            {groupedArtists.map((group, index) => (
              <Carousel.Item key={index}>
                <div className="row">
                  {group.map((artista) => (
                    <div className="col-md-3" key={artista.name}>
                      <CardArtist key={artista.name} artista={artista} />
                    </div>
                  ))}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </>
  );
};

export default ArtistDirectory;
